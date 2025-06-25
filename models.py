from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import enum

db = SQLAlchemy()

class LeadStage(enum.Enum):
    NEW = "New"
    CONTACTED = "Contacted"
    CONVERTED = "Converted"

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    class_selected = db.Column(db.String(10), nullable=False) # '10th' or '12th'
    percentage = db.Column(db.Float, nullable=False)
    referral_code = db.Column(db.String(50), unique=True, nullable=True) # Made nullable, generate after student creation
    lead_stage = db.Column(db.Enum(LeadStage), default=LeadStage.NEW, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # Relationships
    referred_by_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=True)
    referred_students = db.relationship('Student', backref=db.backref('referrer', remote_side=[id]))

    def __repr__(self):
        return f'<Student {self.name}>'

class College(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, unique=True)
    logo_url = db.Column(db.String(255), nullable=True)
    contact_email = db.Column(db.String(150), unique=True, nullable=False)
    # password_hash = db.Column(db.String(255), nullable=False) # Add later with auth
    is_approved = db.Column(db.Boolean, default=False, nullable=False) # Admin approval
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    courses = db.relationship('Course', backref='college', lazy=True)
    scholarships = db.relationship('Scholarship', backref='college', lazy=True)

    def __repr__(self):
        return f'<College {self.name}>'

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('college.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    eligibility_criteria = db.Column(db.Text, nullable=True)
    future_opportunities = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f'<Course {self.name}>'

class Scholarship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    college_id = db.Column(db.Integer, db.ForeignKey('college.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=True) # Can be general or course-specific
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    eligibility_marks = db.Column(db.Float, nullable=True) # Min percentage
    amount_details = db.Column(db.String(255), nullable=True) # e.g., "50% tuition waiver", "INR 25000"
    applicable_class = db.Column(db.String(10), nullable=True) # e.g., '12th'
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    course = db.relationship('Course', backref='scholarships_on_course', lazy=True)


    def __repr__(self):
        return f'<Scholarship {self.name}>'

class OfferType(enum.Enum):
    DISCOUNT = "Discount"
    GOODIE = "Goodie"
    OTHER = "Other"

class Offer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    provider_name = db.Column(db.String(150), nullable=False) # e.g., "Elite Coaching Hub", "The Bookworm"
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.Enum(OfferType), nullable=False)
    eligibility_marks = db.Column(db.Float, nullable=True) # Min percentage
    applicable_class = db.Column(db.String(10), nullable=True) # e.g., '10th', '12th', or All
    terms_and_conditions = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f'<Offer {self.provider_name} - {self.description[:30]}>'

# TODO: Add other models: Referral, AdminUser, WebsiteSetting, PopupAnnouncement, Blogpost
# Referral model would look something like:
# class Referral(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     referrer_student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
#     referred_student_id = db.Column(db.Integer, db.ForeignKey('student.id'), unique=True, nullable=False) # Ensure one student can only be referred once
#     is_eligible_for_reward = db.Column(db.Boolean, default=False) # Admin can mark this
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
#     # referrer = db.relationship('Student', foreign_keys=[referrer_student_id], backref='referrals_made')
#     # referred = db.relationship('Student', foreign_keys=[referred_student_id], backref='referred_by_link')

# class User(db.Model): # For admin and college logins
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password_hash = db.Column(db.String(200), nullable=False)
#     role = db.Column(db.String(20), nullable=False) # 'admin', 'college_user'
#     college_id = db.Column(db.Integer, db.ForeignKey('college.id'), nullable=True) # Link to college if role is college_user
#     college_admin_for = db.relationship('College', backref='admin_users', lazy=True)

# class WebsiteSetting(db.Model):
# ... and so on for other models
