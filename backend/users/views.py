from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User, PasswordReset
import jwt, datetime
from django.utils import timezone
from datetime import timedelta
from rest_framework import status
from django.core.mail import send_mail
import logging

logger = logging.getLogger(__name__)


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


class ForgotPasswordView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            
            if not email:
                return Response(
                    {'error': 'Email is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = User.objects.filter(email=email).first()
            if not user:
                return Response(
                    {'error': 'No user found with this email'}, 
                    status=status.HTTP_404_NOT_FOUND
                )

            try:
                # Delete any existing unused OTPs
                PasswordReset.objects.filter(
                    user=user, 
                    is_used=False
                ).delete()

                # Create new OTP
                password_reset = PasswordReset.objects.create(user=user)
                
                # Log the OTP for debugging (remove in production)
                logger.debug(f"Generated OTP: {password_reset.otp}")

                # Try sending email
                try:
                    password_reset.send_otp_email()
                except Exception as mail_error:
                    logger.error(f"Email error: {str(mail_error)}")
                    return Response(
                        {'error': f'Email sending failed: {str(mail_error)}'}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

                return Response({
                    'message': 'OTP has been sent to your email'
                })

            except Exception as db_error:
                logger.error(f"Database error: {str(db_error)}")
                return Response(
                    {'error': f'Database operation failed: {str(db_error)}'}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response(
                {'error': f'An unexpected error occurred: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not all([email, otp, new_password]):
            return Response(
                {'error': 'Email, OTP and new password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                {'error': 'Invalid email'}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if OTP exists and is valid
        password_reset = PasswordReset.objects.filter(
            user=user,
            otp=otp,
            is_used=False,
            created_at__gte=timezone.now() - timedelta(minutes=10)
        ).first()

        if not password_reset:
            return Response(
                {'error': 'Invalid or expired OTP'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Set new password
        user.set_password(new_password)
        user.save()

        # Mark OTP as used
        password_reset.is_used = True
        password_reset.save()

        return Response({
            'message': 'Password has been reset successfully'
        })