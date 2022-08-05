from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework import generics
from . import models
from . import serializers


class CreateEmailsView(APIView):
    def post(self, request):
        data = request.data
        for i in data['mails']:
            try:
                new_email = models.Address.objects.create(email=i)
                new_email.save()
            except:
                continue

        return HttpResponse('ok')


class EmailsListView(generics.ListAPIView):
    serializer_class = serializers.AddressListSerializer
    queryset = models.Address.objects.all()


class ValidEmailsListView(generics.ListAPIView):
    serializer_class = serializers.ValidAddressListSerializer
    queryset = models.ValidAddress.objects.all()


class CreateValidEmailView(generics.CreateAPIView):
    serializer_class = serializers.ValidAddressDetailSerializer
    queryset = models.ValidAddress.objects.all()


def set_all_checked(request):
    emails = models.Address.objects.all()
    for i in emails:
        i.sent = True
        i.save()

    return HttpResponse('ok')


def delete_all_addresses_checked(request):
    emails = models.Address.objects.all()
    for i in emails:
        i.delete()

    return HttpResponse('ok')