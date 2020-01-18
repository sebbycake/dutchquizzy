from django.shortcuts import render, get_object_or_404
from quiz.models import Questions, Answers
from django.http import JsonResponse, HttpResponse
import random

# Create your views here.
def send_json(request):
    total_qn = Questions.objects.count()
    # total_ans = Answers.objects.count()
    random_num_qn = random.choice(range(1,total_qn+1))
    # random_num_ans = random.choice(range(1,total_ans+1))
    question = get_object_or_404(Questions, id=random_num_qn)
    correct_ans = list(question.answers_set.filter(is_correct=True))[0]
    remaining_ans_id = list(Answers.objects.values_list('id', flat=True).exclude(id=correct_ans.id))
    remaining_ans = list(Answers.objects.filter(id__in=remaining_ans_id))
    random.shuffle(remaining_ans)
    random.shuffle(remaining_ans)
    ans1 = remaining_ans[0]
    ans2 = remaining_ans[1]
    ans3 = remaining_ans[2]
    # ans1 = Answers.objects.get(id=random.choice(remaining_ans_id))
    # ans2 = Answers.objects.get(id=random.choice(remaining_ans_id))
    # ans3 = Answers.objects.get(id=random.choice(remaining_ans_id))
    json_obj = {
        'question': question.title,
        'answers': {
            'ans1': ans1.title,
            'ans2': ans2.title,
            'ans3': ans3.title,
            'ans4': correct_ans.title,
        }     
    }
    return JsonResponse(json_obj)


def check_correct_ans(request):
    if request.method == 'POST':    
        qn = request.POST['question']
        qn_obj = get_object_or_404(Questions, title=qn)
        ans = request.POST['answer']
        correct_ans = list(qn_obj.answers_set.filter(is_correct=True))[0]
        if ans == correct_ans.title:
            return JsonResponse({'status': 'ok'})
        return JsonResponse({'status': 'ko'})
    