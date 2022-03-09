from flask import Blueprint

error_pages = Blueprint("error_pages", __name__)


@error_pages.route("/permission-denied")
def permission_denied() -> str:
    return "permission_denied error"


@error_pages.route("/position-unavailable")
def position_unavailable() -> str:
    return "position_unavailable error"


@error_pages.route("/timeout")
def timeout() -> str:
    return "timeout error"


@error_pages.route("/unknown-error")
def unknown_error() -> str:
    return "unknown_error error"