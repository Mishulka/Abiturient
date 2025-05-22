from .models import Application
from rest_framework import serializers


class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'status']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)