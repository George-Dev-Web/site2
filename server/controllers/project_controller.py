from flask import Blueprint, request, jsonify
from config import db
from models.project import Project

project_bp = Blueprint("project_bp", __name__)

@project_bp.route("/", methods=["GET"])
def get_projects():
    projects = Project.query.all()
    return jsonify([{"id": p.id, "name": p.name, "description": p.description} for p in projects])

@project_bp.route("/", methods=["POST"])
def create_project():
    data = request.get_json()
    project = Project(name=data["name"], description=data.get("description"))
    db.session.add(project)
    db.session.commit()
    return jsonify({"message": "Project created"}), 201

@project_bp.route("/<int:id>", methods=["PATCH"])
def update_project(id):
    data = request.get_json()
    project = Project.query.get_or_404(id)
    project.name = data.get("name", project.name)
    project.description = data.get("description", project.description)
    db.session.commit()
    return jsonify({"message": "Project updated"})

@project_bp.route("/<int:id>", methods=["DELETE"])
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted"})
