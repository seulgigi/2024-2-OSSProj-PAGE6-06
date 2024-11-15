# mylibrary/serializers.py

from rest_framework import serializers
from .models import Book
from routinelist.models import RoutineComplete

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publisher', 'coverImage', 'summary']

# class RoutineRecordSerializer(serializers.ModelSerializer):
#         book_title = serializers.CharField(source='book.title', read_only=True)
#         class Meta:
#              model = RoutineRecord
#              fields = ['bookTitle']

class RoutineCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoutineComplete
        fields = '__all__'