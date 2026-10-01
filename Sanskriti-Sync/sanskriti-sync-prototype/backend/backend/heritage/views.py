from rest_framework import generics
from .models import HeritageEntry
from .serializers import HeritageEntrySerializer

# List all verified heritage entries for map & archive
class PublicHeritageListView(generics.ListAPIView):
    queryset = HeritageEntry.objects.filter(verification_status='APPROVED')
    serializer_class = HeritageEntrySerializer

# Submit new heritage entry (Enters Pending queue)
class SubmitHeritageView(generics.CreateAPIView):
    queryset = HeritageEntry.objects.all()
    serializer_class = HeritageEntrySerializer