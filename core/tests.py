from django.test import TestCase

# Create your tests here.
class ExampleTestCase(TestCase):
    
    def testSum(self):
        self.assertEqual(2, 1 + 1)
        