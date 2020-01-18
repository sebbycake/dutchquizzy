from django.db import models

# Create your models here.
class Questions(models.Model):
    title = models.CharField(max_length=163)

    def __str__(self):
        return self.title

class Answers(models.Model):
    title = models.CharField(max_length=163)
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.title
