from rest_framework import serializers
from .models import HeritageEntry

class HeritageEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = HeritageEntry
        fields = '__all__'