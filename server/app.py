from flask import Flask
from flask_cors import CORS
from config import db, migrate
from controllers.project_controller import project_bp
from controllers.task_controller import task_bp
from controllers.assignee_controller import assignee_bp
from controllers.auth_controller import auth_bp  # ✅ import auth blueprint
from flask_jwt_extended import JWTManager  # ✅ NEW: import JWTManager

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:911Gt3RS@localhost:5432/sitetask_db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "super-secret"  # ✅ required for JWT

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    JWTManager(app)  # ✅ NEW: initialize JWT manager

    app.register_blueprint(project_bp, url_prefix="/projects")
    app.register_blueprint(task_bp, url_prefix="/tasks")
    app.register_blueprint(assignee_bp, url_prefix="/assignees")
    app.register_blueprint(auth_bp,  url_prefix="/auth")  # ✅ auth routes (register, login)

    return app
