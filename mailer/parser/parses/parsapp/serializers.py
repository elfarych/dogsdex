from rest_framework import serializers
from . import models


class AddressListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Address
        fields = ('email',)
