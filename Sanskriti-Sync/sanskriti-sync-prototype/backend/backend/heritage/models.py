from django.db import models
from django.contrib.auth.models import User

class HeritageEntry(models.Model):
    CATEGORIES = [
        ('FOLK_ART', 'Folk Art'),
        ('PERFORMANCE', 'Folk Performance'),
        ('FESTIVAL', 'Festival'),
        ('FOOD', 'Traditional Food'),
        ('CRAFT', 'Craft & Technique'),
        ('LANGUAGE', 'Dialect / Oral Story'),
    ]

    PRESERVATION_STATUS = [
        ('ACTIVE', 'Actively Practised'),
        ('DECLINING', 'Declining'),
        ('RARE', 'Rare'),
        ('ENDANGERED', 'Endangered'),
    ]

    VERIFICATION_STATUS = [
        ('PENDING', 'Pending Review'),
        ('APPROVED', 'Approved & Published'),
        ('REJECTED', 'Rejected'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORIES)
    description = models.TextField()
    cultural_significance = models.TextField()
    
    # Geographical metadata
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    # Preservation and Workflow tracking
    preservation_status = models.CharField(max_length=20, choices=PRESERVATION_STATUS, default='ACTIVE')
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS, default='PENDING')
    
    # Provenance
    contributor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.state})"