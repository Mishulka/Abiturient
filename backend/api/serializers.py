from .models import Application, Institution
from rest_framework import serializers


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'name']

class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    institution = InstitutionSerializer(read_only=True)
    institution_id = serializers.PrimaryKeyRelatedField(queryset=Institution.objects.all(), source='institution', write_only=True)
    
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'status', 'institution', 'institution_id']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)