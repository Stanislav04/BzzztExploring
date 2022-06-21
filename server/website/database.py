from flask import Blueprint, request
from .models import User, Comment
from flask_login import current_user

database = Blueprint("database", __name__)


@database.route("/user/<int:user_id>")  # add methods=["GET", "POST", etc.]
def user(user_id: int) -> None:
    pass


@database.route("/place/<int:place_id>")
def place(place_id: int) -> None:  # for the public places
    pass


# temporary route
@database.route("/comments/<int:user_id>")
def comments() -> None:
    pass


# temporary route
@database.route("/comment", methods=["POST"])
def add_comment() -> None:
    data = request.form.get("data")


@database.route("/places")
def places() -> None:
    user = User.query.filter_by(id=current_user._get_current_object().get_id()).first()
    return user.get_places()