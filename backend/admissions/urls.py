"""
URL configuration for admissions project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from api.views import get_user_applications

def debug_view(request):
    return HttpResponse("DEBUG WORKING!", status=200)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/applications/my/', get_user_applications),
    path('api/auth/', include('djoser.urls')),  # регистрация и др.
    path('api/auth/', include('djoser.urls.jwt')),  # JWT
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
