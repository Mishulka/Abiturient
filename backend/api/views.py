from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import ApplicationSerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_stuff:
            return Application.objects.all()
        return Application.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)