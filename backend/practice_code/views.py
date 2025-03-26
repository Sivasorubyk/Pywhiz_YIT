from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import google.generativeai as genai
import re  # Import regular expressions for pattern matching

# Create your views here.

class RunCodeView(APIView):
    def post(self, request):
        code = request.data.get('code', '')

        # Define the expected pattern (e.g., printing a specific name)
        expected_pattern = r'print\("PyWhiz"\)'  # Change "Your Name" to the expected name

        # Validate the user's code
        if not re.search(expected_pattern, code):
            return Response({'error': 'Code does not match the expected pattern.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Initialize Gemini API with the API key from settings
            genai.configure(api_key=settings.GEMINI_API_KEY)  # Use the environment variable
            model = genai.GenerativeModel('gemini-1.5-flash')  # Use the base gemini model

            # Prepare the prompt
            prompt = f'Execute this Python code and return output:\n{code}'

            # Generate the response
            response = model.generate_content(prompt)
            output = response.text.strip()

            return Response(output, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
