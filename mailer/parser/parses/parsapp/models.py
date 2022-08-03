from django.db import models


class Address(models.Model):
    email = models.EmailField(unique=True)
    sent = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

    class Meta:
        ordering = ('-date',)
