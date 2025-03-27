from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
from django.conf import settings

class RunCodeView(APIView):
    def post(self, request):
        code = request.data.get('code', '')
        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            prompt = f'Is the following Python code 100% a print statement? Answer with T or F, then give 2 sentences of suggestions or improvements.\n{code}\n'
            response = genai.GenerativeModel('gemini-1.5-flash').generate_content(prompt)
            suggestion = response.text
            is_print = suggestion[0] == 'T'
            return Response({'is_print': is_print, 'suggestion': suggestion[2:]}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f"Error generating suggestion from Gemini: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    