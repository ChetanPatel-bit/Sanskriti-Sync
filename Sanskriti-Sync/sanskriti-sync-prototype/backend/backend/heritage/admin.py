from django.contrib import admin
from .models import HeritageEntry

@admin.register(HeritageEntry)
class HeritageEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'state', 'district', 'verification_status', 'preservation_status')
    list_filter = ('verification_status', 'preservation_status', 'category', 'state')
    search_fields = ('title', 'description', 'district', 'state')