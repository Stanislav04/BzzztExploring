from flask import Blueprint, render_template, request, redirect, url_for, flash
from .models import User
from werkzeug.security import check_password_hash
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["GET", "POST"])
def login() -> str:
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email=email).first()

        if user:
            if check_password_hash(user.password, password):
                flash("Logged in successfully!", category="success")
                login_user(user)
                return redirect(url_for("views.homepage"))
            else:
                flash("Invalid password.", category="error")
        else:
            flash("No user with such email exists!", category="error")

    return render_template("login.html")


@auth.route("/logout")
@login_required
def logout() -> str:
    logout_user()
    return redirect(url_for("auth.login"))


@auth.route("/sign-up", methods=["GET", "POST"])
def sign_up() -> str:
    if request.method == "POST":
        pass

    return render_template("sign_up.html")
