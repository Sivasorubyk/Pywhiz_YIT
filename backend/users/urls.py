from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, ForgotPasswordView, VerifyOTPView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('forgot-password', ForgotPasswordView.as_view(), name='forgot-password'),
    path('verify-otp', VerifyOTPView.as_view(), name='verify-otp'),
]