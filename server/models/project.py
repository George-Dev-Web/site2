from config import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default="Planning")  # 👈 make sure this exists
    due_date = db.Column(db.Date)
    
    tasks = db.relationship('Task', backref='project', lazy=True)
