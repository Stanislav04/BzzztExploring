from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from werkzeug.security import generate_password_hash


db = SQLAlchemy()
DB_NAME = "database.db"


def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SECRET_KEY"] = f"{generate_password_hash('Arcanum clavem', method='sha256', salt_length=27)}"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    db.init_app(app)

    from .views import views
    from .auth import auth
    from .error_pages import error_pages
    from .database import database

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(error_pages, url_prefix="/error")
    app.register_blueprint(database, url_prefix="/")

    from .models import User, Place, Comment

    create_database(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    return app


def create_database(app: Flask) -> None:
    if not path.exists(f"website/{DB_NAME}"):
        db.create_all(app=app)
