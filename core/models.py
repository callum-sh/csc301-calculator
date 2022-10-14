from django.db import models

# Create your models here.
class Items(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.price = round(self.price, 2)
        super(Items, self).save(*args, **kwargs)
