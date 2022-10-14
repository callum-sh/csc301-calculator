from rest_framework import serializers
from .models import Items, Discounts

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ('id', 'name', 'price')

class DiscountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Discounts
        fields = ('id', 'type', 'percentage')