from django.test import TestCase
from quiz.models import Questions, Answers

# Create your tests here.

class JSONObjectTest(TestCase):

    def test_send_json_object(self):
        q1 = Questions.objects.create(title='Q1')
        q2 = Questions.objects.create(title='Q2')
        a1 = Answers.objects.create(title='a1', question=q1)
        a2 = Answers.objects.create(title='a2', question=q1, is_correct=True)
        a3 = Answers.objects.create(title='a11', question=q2)
        a4 = Answers.objects.create(title='a22', question=q2, is_correct=True)
        response = self.client.get('/api/question/')
        # print(response)
        # print(response.json())

    def test_check_correct_answer(self):
        q1 = Questions.objects.create(title='Q1')
        q2 = Questions.objects.create(title='Q2')
        a1 = Answers.objects.create(title='a1', question=q1)
        a2 = Answers.objects.create(title='a2', question=q1, is_correct=True)
        a3 = Answers.objects.create(title='a11', question=q2)
        a4 = Answers.objects.create(title='a22', question=q2, is_correct=True)
        response = self.client.post('/api/check_correct_ans/', data={'question': 'Q2', 'answer': 'a22'})
        json_response = response.json()
        self.assertEqual(json_response['status'], 'ok')



