from flask import Blueprint

error_pages = Blueprint("error_pages", __name__)


@error_pages.route("/permission-denied")
def permission_denied() -> None:
    pass


@error_pages.route("/position-unavailable")
def position_unavailable() -> None:
    pass


@error_pages.route("/timeout")
def timeout() -> None:
    pass


@error_pages.route("/unknown-error")
def unknown_error() -> None:
    pass
