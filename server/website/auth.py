from flask import Blueprint, render_template, request, redirect, url_for, flash
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user
from . import db


auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["GET", "POST"])
def login() -> str:
    if request.method == "POST":
        email_or_nickname = request.form.get("identifier")
        password = request.form.get("password")

        user = User.query.filter_by(email=email_or_nickname).first()

        if not user:
            user = User.query.filter_by(nickname=email_or_nickname).first()

        if user:
            if check_password_hash(user.password, password):
                flash("Logged in successfully!", category="success")
                login_user(user)
                return redirect(url_for("views.homepage"))
            else:
                flash("Invalid password.", category="error")
        else:
            flash("No user with such email exists!", category="error")

    return redirect(url_for("views.homepage"))


@auth.route("/logout")
@login_required
def logout() -> str:
    logout_user()
    return redirect(url_for("auth.login"))


@auth.route("/sign-up", methods=["GET", "POST"])
def sign_up() -> str:
    if current_user.is_authenticated:
        return redirect(url_for("views.homepage"))
    if request.method == "POST":
        nickname = request.form.get("nickname")
        email = request.form.get("email")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")

        if User.query.filter_by(email=email).first():
            flash("Email already exists.", category="error")
        elif User.query.filter_by(nickname=nickname).first():
            flash("Nickname is already taken.", category="error")
        elif password1 != password2:
            flash("Password don't match", category="error")
        else:
            new_user = User(email=email, nickname=nickname,
                            password=generate_password_hash(password1, method="sha256", salt_length=27))

            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)

            return redirect(url_for("views.homepage"))

    return render_template("sign_up.html")
