from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('applicant', 'Applicant'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='applicant')
    
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    
class Institution(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Application(models.Model):
    STATUS_CHOICES = [
        ('new', 'В обработке'),
        ('accepted', 'Принят'),
        ('rejected', 'Отклонён'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    birth_date = models.DateField()
    ege_score = models.PositiveIntegerField()
    passport_scan = models.FileField(upload_to ='passports/')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name="applications",  null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.get_status_display()}"
    
