from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import google.generativeai as genai
from django.conf import settings
from .models import CodeSubmission
from users.models import User
from .serializers import CodeSubmissionSerializer

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

@api_view(['POST'])
def run_code(request):
    code = request.data.get("code", "")
    user_id = request.data.get("user_id", None)

    if not code or user_id is None:
        return Response({"error": "Code and user ID are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check for syntax errors
        try:
            compile(code, '<string>', 'exec')
        except SyntaxError as e:
            return Response({'error': f"Syntax error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the code contains the expected print statements
        if "print(" not in code:
            return Response({
                'is_print': False,
                'suggestion': "Your code should include a print statement to display your name and school."
            }, status=status.HTTP_200_OK)

        # Send code to Gemini 1.5 Flash API for execution
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"Execute this Python code and return output:\n```python\n{code}\n```")
        output = response.text if response.text else "No output returned"

        # Save to database
        submission = CodeSubmission.objects.create(user_id=user_id, code=code, output=output)

        # Serialize response
        serializer = CodeSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
