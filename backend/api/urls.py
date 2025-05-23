from django.http import HttpResponse
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, delete_application, get_user_applications, register
from django.urls import path, include

router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
     path('getapp/', get_user_applications, name='user-applications'),
    path('applications/my/', get_user_applications, name='user-applications'),
    path('register/', register, name='register'),
    path('deleteapp/<int:pk>/', delete_application)
] + router.urls