# server/seed.py

from app import create_app
from config import db
from models.project import Project
from models.assignee import Assignee
from models.task import Task

from datetime import date

app = create_app()

with app.app_context():
    # Drop and recreate tables
    db.drop_all()
    db.create_all()

    # Seed Projects
    project1 = Project(
        name="Bridge Construction Phase 1",
        description="Foundation and pillars setup for Nairobi River bridge.",
        status="In Progress",
        due_date=date(2025, 8, 15),
    )
    project2 = Project(
        name="Road Expansion Project",
        description="Widening Mombasa Road to ease traffic.",
        status="Planning",
        due_date=date(2025, 10, 1),
    )

    db.session.add_all([project1, project2])
    db.session.commit()

    # Seed Assignees
    assignee1 = Assignee(name="Jane Doe", role="Engineer")
    assignee2 = Assignee(name="John Smith", role="Supervisor")

    db.session.add_all([assignee1, assignee2])
    db.session.commit()

    # Seed Tasks
    task1 = Task(
        title="Lay Foundation",
        status="Completed",
        start_date=date(2025, 6, 1),
        end_date=date(2025, 6, 15),
        project_id=project1.id,
        assignee_id=assignee1.id,
    )
    task2 = Task(
        title="Install Pillars",
        status="In Progress",
        start_date=date(2025, 6, 16),
        end_date=date(2025, 7, 5),
        project_id=project1.id,
        assignee_id=assignee2.id,
    )
    task3 = Task(
        title="Site Clearance",
        status="Pending",
        start_date=date(2025, 7, 1),
        end_date=date(2025, 7, 10),
        project_id=project2.id,
        assignee_id=assignee1.id,
    )

    db.session.add_all([task1, task2, task3])
    db.session.commit()

    print("🌱 Database seeded successfully!")
