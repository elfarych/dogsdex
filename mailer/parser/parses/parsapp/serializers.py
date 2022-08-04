from rest_framework import serializers
from . import models


class AddressListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Address
        fields = ('email',)


class ValidAddressListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ValidAddress
        fields = ('email',)


class ValidAddressDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ValidAddress
        fields = '__all__'
