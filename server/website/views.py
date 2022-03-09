from flask import Blueprint, render_template
from flask_login import current_user

views = Blueprint("views", __name__)


@views.route("/")
def homepage() -> str:
    return render_template("homepage.html", user=current_user)
