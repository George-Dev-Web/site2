from flask import Flask
from flask_cors import CORS
from config import db, migrate
from controllers.project_controller import project_bp
from controllers.task_controller import task_bp
from controllers.assignee_controller import assignee_bp

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:911Gt3RS@localhost:5432/sitetask_db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    app.register_blueprint(project_bp, url_prefix="/projects")
    app.register_blueprint(task_bp, url_prefix="/tasks")
    app.register_blueprint(assignee_bp, url_prefix="/assignees")

    return app
