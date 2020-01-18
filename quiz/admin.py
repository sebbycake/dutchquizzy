from django.contrib import admin
from quiz.models import Questions, Answers

@admin.register(Questions)
class QuestionsAdmin(admin.ModelAdmin):
    pass

@admin.register(Answers)
class AnswersAdmin(admin.ModelAdmin):
    pass

'''
superuser
username:sebbycake
pw: sebbycake
email: sebbycake@gmail.com
'''

