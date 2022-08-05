from django.contrib import admin
from . import models


@admin.register(models.Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('email', 'sent', 'date')
    search_fields = ('email',)
    list_filter = ('sent', 'date')


@admin.register(models.ValidAddress)
class ValidAddressAdmin(admin.ModelAdmin):
    list_display = ('email', 'sent')
    search_fields = ('email',)
    list_filter = ('sent',)

