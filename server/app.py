import os # NEW: Import the os module to access environment variables

from flask import Flask
from flask_cors import CORS
from config import db, migrate
from controllers.project_controller import project_bp
from controllers.task_controller import task_bp
from controllers.assignee_controller import assignee_bp
from controllers.auth_controller import auth_bp
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)

    # --- Database Configuration ---
    # This will use the DATABASE_URL environment variable on Render,
    # and fall back to your local hardcoded URL if the environment variable is not set (i.e., locally).
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:911Gt3RS@localhost:5432/sitetask_db" # Your local PostgreSQL URL (fallback)
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret")

    db.init_app(app)
    migrate.init_app(app, db)

   
    deployed_frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173") # Fallback for local dev

    
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


    JWTManager(app)

    app.register_blueprint(project_bp, url_prefix="/projects")
    app.register_blueprint(task_bp, url_prefix="/tasks")
    app.register_blueprint(assignee_bp, url_prefix="/assignees")
    app.register_blueprint(auth_bp,  url_prefix="/auth")

    return app


app = create_app()

# This part is ONLY for local development. Gunicorn handles production.
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) # Or your preferred local port
