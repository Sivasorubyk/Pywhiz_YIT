from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.conf import settings
import random


# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class PasswordReset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.otp:
            # Generate 6 digit OTP
            self.otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        super().save(*args, **kwargs)

    def send_otp_email(self):
        subject = 'Password Reset OTP'
        message = f'Your OTP for password reset is: {self.otp}\nThis OTP will expire in 10 minutes.'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [self.user.email]
        
        try:
            send_mail(subject, message, from_email, recipient_list)
        except Exception as e:
            # Log the error or handle it as needed
            raise Exception(f"Failed to send email: {str(e)}")