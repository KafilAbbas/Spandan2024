from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, CustomOtpVerifiy_userCreate

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('otp/verify/', CustomOtpVerifiy_userCreate.as_view(), name="verify_otp"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]