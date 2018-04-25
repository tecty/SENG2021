from django.test import TestCase
from .models import * 
from decimal import Decimal


# Create your tests here.
class PostTest(TestCase):
    def test_create_location(self):
        # create a location for test
        the_location = create_location("hello", 100.1023214, 199.2231)

        # get this location from database 
        the_location = Location.objects.get(pk = the_location.id)

        self.assertEquals(the_location.name, "hello")
        self.assertEquals(the_location.lat, Decimal("100.1023214"))
        self.assertEquals(the_location.lng, Decimal("199.2231"))
    def test_create_post(self):
        # create a new post must have create a location 
        the_location = create_location("hello", 100.1023214, 199.2231)
        the_post = create_post("hhh","Idk",the_location)

        # get this location from database 
        the_post = Post.objects.get(pk = the_post.id)

        self.assertEqual(the_post.title, "hhh")
        self.assertEqual(the_post.detail, "Idk")
        self.assertEqual(the_post.location.id, the_location.id)
