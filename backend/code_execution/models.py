from django.db import models
from users.models import User  # Import your custom user model

class CodeSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to custom user
    code = models.TextField()  # Store Python code
    output = models.TextField(null=True, blank=True)  # Execution output
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp

    def __str__(self):
        return f"{self.user.email} - {self.created_at}"
