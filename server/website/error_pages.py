from flask import Blueprint

error_pages = Blueprint("error_pages", __name__)


@error_pages.route("/permission_denied")
def permission_denied() -> None:
    pass


@error_pages.route("/position_unavailable")
def position_unavailable() -> None:
    pass


@error_pages.route("/timeout")
def timeout() -> None:
    pass


@error_pages.route("/unknown_error")
def unknown_error() -> None:
    pass
