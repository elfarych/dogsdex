from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.CreateEmailsView.as_view()),
    path('list/', views.EmailsListView.as_view())
]