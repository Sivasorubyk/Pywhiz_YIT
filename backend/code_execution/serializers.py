from rest_framework import serializers
from .models import CodeSubmission

class CodeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSubmission
        fields = ['id', 'user', 'code', 'output', 'created_at']
        read_only_fields = ['user', 'output', 'created_at']
