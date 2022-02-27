from flask import Blueprint

database = Blueprint("database", __name__)


@database.route("/user/<int:user_id>")  # add methods=["GET", "POST", etc.]
def user(user_id: int) -> None:
    pass


@database.route("/place/<int:place_id>")
def place(place_id: int) -> None:  # for the public places
    pass
