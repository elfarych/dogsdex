from django.urls import path
from . import views

urlpatterns = [
    path('create_list/', views.CreateEmailsView.as_view()),
    path('create/', views.CreateValidEmailView.as_view()),
    path('list/', views.EmailsListView.as_view()),
    path('valid_list/', views.ValidEmailsListView.as_view()),
    path('delete_addresses/', views.delete_all_addresses_checked)
]