from django.test import TestCase
from quiz.models import Questions, Answers
from django.core.exceptions import ValidationError

# Create your tests here.

class QuestionsModelTest(TestCase):

    def test_default_ans_is_correct_is_false(self):
        q1 = Questions.objects.create(title='Q1')
        a1 = Answers.objects.create(title='a1', question=q1)
        self.assertEqual(a1.is_correct, False)

    def test_create_questions_answers(self):
        q1 = Questions.objects.create(title='Q1')
        a1 = Answers.objects.create(title='a1', question=q1)
        self.assertEqual(q1.title, 'Q1')
        self.assertEqual(a1.title, 'a1')
        self.assertEqual(a1.question, q1)
        
    def test_fetch_question_ans_list(self):
        q1 = Questions.objects.create(title='Q1')
        q2 = Questions.objects.create(title='Q2')
        a1 = Answers.objects.create(title='a1', question=q1)
        a2 = Answers.objects.create(title='a2', question=q1)
        a3 = Answers.objects.create(title='a11', question=q2)
        a4 = Answers.objects.create(title='a22', question=q2)
        q1_ans_list = list(q1.answers_set.all())
        q2_ans_list = list(q2.answers_set.all())
        self.assertEqual(q1_ans_list, [a1, a2])
        self.assertEqual(q2_ans_list, [a3, a4])

    def test_fetch_questions_with_correct_ans(self):
        q1 = Questions.objects.create(title='Q1')
        a1 = Answers.objects.create(title='a1', question=q1)
        a2 = Answers.objects.create(title='a2', question=q1, is_correct=True)
        correct_ans = list(q1.answers_set.filter(is_correct=True))
        self.assertEqual(correct_ans, [a2])