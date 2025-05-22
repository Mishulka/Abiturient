from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Application
from .serializers import ApplicationSerializer
from rest_framework import viewsets
from rest_framework import status
from rest_framework import permissions
from django.contrib.auth import get_user_model  # Option 1
User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_applications(request):
    applications = Application.objects.filter(user=request.user)
    serializer = ApplicationSerializer(applications, many=True)
    if not request.user.is_authenticated:
        return Response({"error": "Not authenticated"}, status=401)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Application.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
