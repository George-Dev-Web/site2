from config import db

class Assignee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100))

    tasks = db.relationship('Task', backref='assignee', lazy=True)
