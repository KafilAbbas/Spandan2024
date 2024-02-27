from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,BasePermission
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.core.mail import send_mail  
from django_otp import devices_for_user
from django_rest_passwordreset.tokens import get_token_generator
from django.template.loader import render_to_string
from django.conf import settings
from django.urls import reverse
from django_rest_passwordreset.tokens import get_token_generator
from django.template.loader import render_to_string
from django.conf import settings
from .models import NewUser
from django_otp.oath import TOTP
import random
import string
from django.core.cache import cache
from .signup_utils import *

# Imports for generating tokens in the singup part
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication



# class IsEmailVerified(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.is_email_verified



class CustomOtpVerifiy_userCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            serializer = CustomUserSerializer(data=request.data)
            if serializer.is_valid():
                
                email = request.data.get('email')
                otp_sent = cache.get(email)
                otp_recieved = request.data.get('otp')
                print(f'otp sent : {otp_sent} and otp_recieved : {otp_recieved}')

                if not otp_recieved:
                    cache.delete(email)
                    return Response({'error': 'OTP not sent and hence verification failed'}, status=status.HTTP_400_BAD_REQUEST)

                if otp_sent is None:
                    return Response({'error': 'OTP expired please try again'}, status=status.HTTP_400_BAD_REQUEST)
                
                if otp_sent != otp_recieved:
                    # cache.delete(email)   think if this is need or not. That is if once failed try again or not.
                    return Response({'error': 'OTP did not match verification failed'}, status=status.HTTP_400_BAD_REQUEST)
                
                
                cache.delete(email)
                print("hellloasdfasdf")
                user = NewUser(**(serializer.data))
                password = request.data.get('password')
                if not password:
                    return Response({'error': 'User not created as password was not sent'}, status=status.HTTP_400_BAD_REQUEST)
                print("hellloasdfasdf")
                user.set_password(request.data.get('password'))
                print("hellloasdfasdf")
                user.save()


                # token part is still untested as because of database constraints flow stopped at user.save()
                response_data = serializer.data
                # Generate tokens for the user
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                response_data['access_token'] = access_token
                response_data['refresh_token'] = refresh_token


                return Response(response_data, status=status.HTTP_200_OK)
                
        except Exception as e:
            print(e)
            return Response({'error': 'Internal server error.please try again'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            




class CustomUserCreate(APIView):
    permission_classes = [AllowAny]


    def post(self, request):
        try:
            serializer = CustomUserSerializer(data=request.data)
            if serializer.is_valid():
                
                # check if the email is already registered or not and the availabitlit of password in request
                email = request.data.get('email')
                # if NewUser.objects.filter(email=email).exists():
                #     return Response({'error': 'Email address already registered'}, status=status.HTTP_400_BAD_REQUEST)
                
                # create the otp
                otp = generate_otp(6)

                # store the userdata,password and otp somewhere temporarily for future otp verification
                otp_verification_data = cache_otp_verification_data(email, otp)

                # Send the otp
                if not send_otp(email, otp):
                    return Response({'error': 'Failed to send OTP email. Please try again later.'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
                return Response({'message' : "Otp has been sent to you", 'data' : otp_verification_data}, status=status.HTTP_200_OK)
            

        except Exception as e:
            print(f"Error in signup process: {e}")
            return Response({'error': 'An unexpected error occurred. Please try again later.'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)








    # This will be used for signup
    # def post(self, request, format='json'):

    #     serializer = CustomUserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         # Check if a user with the given email already exists
    #         email = request.data.get('email')
    #         if NewUser.objects.filter(email=email).exists():
    #             return Response({'error': 'Email address already registered'}, status=status.HTTP_400_BAD_REQUEST)

    #         try :
    #             user = serializer.save()
    #         except Exception as e:
    #             # This will be reached if database constraints are broken like uniqueness and others.
    #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #         if user:
    #             json = serializer.data

    #             # Generate tokens for the user
    #             refresh = RefreshToken.for_user(user)
    #             access_token = str(refresh.access_token)
    #             refresh_token = str(refresh)
                
    #             json['access_token'] = access_token
    #             json['refresh_token'] = refresh_token

    #             # email_plaintext_message = "{}?token={}".format(reverse('signup:signup-request'),token)
    #             # print(email_plaintext_message)
    #             # send_mail(
    #             #     # title:
    #             #     "Password Reset for {title}".format(title="Spandan application"),
    #             #     # message:
    #             #     email_plaintext_message,
    #             #     # from:
    #             #     "noreply@somehost.local",
    #             #     # to:
    #             #     [user.email]
    #             # )
    #             # confirm_url = f"/confirm-email?token={token}"
    #             # subject = 'Welcome to Spandan Application!'
    #             # message = render_to_string('account/email_confirmation.html', {'confirm_url': confirm_url})
    #             # from_email = settings.EMAIL_HOST_USER
    #             # recipient_list = [email]
    #             # send_mail(subject, message, from_email, recipient_list, fail_silently=False)


    #             return Response(json, status=status.HTTP_201_CREATED)
    #     print(serializer.errors)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    def get(self,request,format = 'json'):

        from rest_framework_simplejwt.backends import TokenBackend
        from django.contrib.auth import get_user_model

        email = request.query_params['email']
                
        try:
            userr = NewUser.objects.get(email=email)
            serializer = CustomUserSerializer(userr)
            
            return Response(serializer.data,status = status.HTTP_200_OK)
            
        except Exception as e:
            print(e)
            return Response(data={'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)