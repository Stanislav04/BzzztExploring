from . import db
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from SQLAlchemy.sql import func


class User(SQLAlchemy.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    name = db.Column(db.String(150))
    password = db.Column(db.String(150))
    # NOTE: More data about the user


class Place(SQLAlchemy.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    # NOTE: More data about the places

    comments = db.relationship("Comment")

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Comment(SQLAlchemy.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(500))
    date = db.Column(db.DateTime(timezone=True), default=func.now())

    place_id = db.Column(db.Integer, db.ForeignKey("place.id"))
