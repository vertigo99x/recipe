from django.db import models

from django.contrib.auth.models import User, auth
from django.utils import timezone




class Feedbacks(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    description = models.TextField(max_length=6255, null=True, blank=True)
    is_liked = models.BooleanField(default=True)
    
    created = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        if self.is_liked:
            return f"{self.username} Liked the Recommendation; remarks -> {self.description}"
        return f"{self.username} disliked the Recommendation; remarks -> {self.description}"
    
    class Meta:
        ordering = ['-created']
        
        
        
        
class MyUsers(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    fullname = models.CharField(max_length=255, null=False,blank=False)
    diabetes_type = models.IntegerField(choices=[(0,0),(1,1),(2,2)])
    weight = models.IntegerField()
    
    def __str__(self):
        if self.diabetes_type == 0:
            return f"{self.username} -> {self.weight}KG (non-diabetic)"
        return f"{self.username} -> {self.weight}KG (Type {self.diabetes_type} Diabetic)"
        
        