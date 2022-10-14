from django.db import models

# Create your models here.
class Items(models.Model):
    name = models.CharField(max_length=60)
    price = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)

    def __str__(self):
        return self.name

class Discounts(models.Model):
    type = models.CharField(max_length=60)
    percentage = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)

    def __str__(self):
        return self.name