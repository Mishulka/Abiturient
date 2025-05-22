from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, get_user_applications, register
from django.urls import path, include

router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
    path('applications/my/', get_user_applications, name='user-applications'),
    path('register/', register, name='register')
] + router.urls