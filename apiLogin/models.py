from mongoengine import Document , StringField

class User(Document):
    username = StringField()
    password = StringField()