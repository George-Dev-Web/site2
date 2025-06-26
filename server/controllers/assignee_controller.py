from flask import Blueprint, request, jsonify
from config import db
from models.assignee import Assignee

assignee_bp = Blueprint("assignee_bp", __name__)

@assignee_bp.route("/", methods=["GET"])
def get_assignees():
    assignees = Assignee.query.all()
    return jsonify([{"id": a.id, "name": a.name, "role": a.role} for a in assignees])

@assignee_bp.route("/", methods=["POST"])
def create_assignee():
    data = request.get_json()
    assignee = Assignee(name=data["name"], role=data.get("role"))
    db.session.add(assignee)
    db.session.commit()
    return jsonify({"message": "Assignee created"}), 201

@assignee_bp.route("/<int:id>", methods=["PATCH"])
def update_assignee(id):
    data = request.get_json()
    assignee = Assignee.query.get_or_404(id)
    assignee.name = data.get("name", assignee.name)
    assignee.role = data.get("role", assignee.role)
    db.session.commit()
    return jsonify({"message": "Assignee updated"})

@assignee_bp.route("/<int:id>", methods=["DELETE"])
def delete_assignee(id):
    assignee = Assignee.query.get_or_404(id)
    db.session.delete(assignee)
    db.session.commit()
    return jsonify({"message": "Assignee deleted"})
