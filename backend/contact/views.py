from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import ContactMessage
from .serializers import ContactMessageSerializer

@api_view(['POST'])
def send_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message sent successfully!"}, status=201)
    return Response(serializer.errors, status=400)
