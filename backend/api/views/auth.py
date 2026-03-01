from rest_framework import generics, permissions, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from api.models import User
from api.serializers import RegisterSerializer, UserSerializer

# JWT Login with check
class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if self.user.is_staff:
            raise serializers.ValidationError("Admin cannot login via API")
        return data

class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

# User registration
# @method_decorator(ratelimit(key='ip', rate='1000/m', block=True), name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

# Profile view
class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)