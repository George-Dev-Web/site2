from flask import Blueprint, request, jsonify
from config import db
from models.task import Task

task_bp = Blueprint("task_bp", __name__)

@task_bp.route("/", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        "id": t.id, "title": t.title, "status": t.status,
        "start_date": str(t.start_date), "end_date": str(t.end_date),
        "project_id": t.project_id, "assignee_id": t.assignee_id
    } for t in tasks])

@task_bp.route("/", methods=["POST"])
def create_task():
    data = request.get_json()
    task = Task(
        title=data["title"], status=data.get("status", "Pending"),
        start_date=data.get("start_date"), end_date=data.get("end_date"),
        project_id=data["project_id"], assignee_id=data.get("assignee_id")
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({"message": "Task created"}), 201

@task_bp.route("/<int:id>", methods=["PATCH"])
def update_task(id):
    data = request.get_json()
    task = Task.query.get_or_404(id)
    task.title = data.get("title", task.title)
    task.status = data.get("status", task.status)
    task.start_date = data.get("start_date", task.start_date)
    task.end_date = data.get("end_date", task.end_date)
    task.project_id = data.get("project_id", task.project_id)
    task.assignee_id = data.get("assignee_id", task.assignee_id)
    db.session.commit()
    return jsonify({"message": "Task updated"})

@task_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})
