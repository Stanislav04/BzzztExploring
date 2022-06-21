from . import db
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy.sql import func
from flask import jsonify


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    nickname = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(113))
    # NOTE: More data about the user
    places = db.relationship('Place')

    def __init__(self, email, nickname, password):
        self.email = email
        self.nickname = nickname
        self.password = password
        self.places = []

    def get_places(self):
        return jsonify(self.places)


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    # NOTE: More data about the places

    comments = db.relationship("Comment")

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(500))
    date = db.Column(db.DateTime(timezone=True), default=func.now())

    place_id = db.Column(db.Integer, db.ForeignKey("place.id"))