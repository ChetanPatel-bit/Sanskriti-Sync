from django.urls import path
from .views import PublicHeritageListView, SubmitHeritageView

urlpatterns = [
    path('archive/', PublicHeritageListView.as_view(), name='public-archive'),
    path('submit/', SubmitHeritageView.as_view(), name='submit-heritage'),
]