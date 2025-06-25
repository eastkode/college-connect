from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Dummy database for storing leads temporarily
leads_db = []

@app.route('/')
def homepage():
    return render_template('index.html')

import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_migrate import Migrate
from models import db, Student, College, Course, Scholarship, Offer # Import models

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_very_secret_key_fallback') # Use environment variable
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///students.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

# Dummy database for storing leads temporarily - Will be replaced by actual DB operations
# leads_db = []

@app.route('/')
def homepage():
    # Check for referral code in query params
    ref_code = request.args.get('ref')
    if ref_code:
        # In a real app, you might want to store this in the session
        # or pass it to the registration form if they sign up.
        flash(f"Referred by: {ref_code}. Sign up to credit your friend!", "info")
    return render_template('index.html')

@app.route('/submit_lead', methods=['POST'])
def submit_lead():
    if request.method == 'POST':
        student_name = request.form.get('student_name', '').strip()
        email = request.form.get('email', '').strip()
        phone_number = request.form.get('phone_number', '').strip()
        city = request.form.get('city', '').strip()
        class_selected = request.form.get('class_selected')
        percentage_str = request.form.get('percentage', '').strip()
        # ref_code = request.form.get('ref_code') # If passed via hidden field

        errors = False
        if not student_name:
            flash('Student Name is required.', 'error'); errors = True
        if not email:
            flash('Email is required.', 'error'); errors = True
        # TODO: Add more robust email validation (e.g., regex, library)
        # TODO: Add more robust phone validation
        if not phone_number:
            flash('Phone Number is required.', 'error'); errors = True
        if not city:
            flash('City is required.', 'error'); errors = True
        if not class_selected:
            flash('Please select a Class.', 'error'); errors = True

        percentage = None
        if not percentage_str:
            flash('Percentage is required.', 'error'); errors = True
        else:
            try:
                percentage = float(percentage_str)
                if not (0 <= percentage <= 100):
                    flash('Percentage must be between 0 and 100.', 'error'); errors = True
            except ValueError:
                flash('Invalid Percentage format.', 'error'); errors = True

        if errors:
            return redirect(url_for('homepage'))

        # Check if email already exists
        existing_student = Student.query.filter_by(email=email).first()
        if existing_student:
            flash('This email is already registered. Please login or use a different email.', 'error')
            return redirect(url_for('homepage')) # Later redirect to login or a specific page

        new_student = Student(
            name=student_name,
            email=email,
            phone_number=phone_number,
            city=city,
            class_selected=class_selected,
            percentage=percentage
        )
        # Generate referral code (simple example)
        # This needs to be done after the student object is created but before commit to get an ID,
        # or use a different strategy if ID is not available yet (e.g. UUID, or generate after first commit)
        # For now, let's make it simpler and generate it based on a temporary value or after commit.

        db.session.add(new_student)
        try:
            db.session.commit()
            # Generate referral code after commit to ensure ID is available
            new_student.referral_code = f"REF{new_student.id}{new_student.name[:3].upper()}"
            db.session.commit()

            flash('Lead submitted successfully! Your journey starts now.', 'success')
            print(f"New student added: {new_student}")

            if class_selected == '10':
                return redirect(url_for('show_class10_offers', student_id=new_student.id))
            elif class_selected == '12':
                return redirect(url_for('show_class12_scholarships', student_id=new_student.id))
            else:
                return redirect(url_for('homepage')) # Fallback

        except Exception as e:
            db.session.rollback()
            flash(f'Error submitting lead: {str(e)}', 'error')
            print(f"Error: {str(e)}")
            return redirect(url_for('homepage'))

    return redirect(url_for('homepage'))

@app.route('/class10_offers/<int:student_id>')
def show_class10_offers(student_id):
    student = Student.query.get_or_404(student_id)
    if student.class_selected != "10":
        flash('This page is for Class 10th students only.', 'error')
        return redirect(url_for('homepage'))

    # Dummy data for offers, will be replaced by DB queries
    # For example: offers = Offer.query.filter_by(applicable_class="10", eligibility_marks <= student.percentage).all()
    return render_template('class10_offers.html', lead=student) # 'lead' used in template

@app.route('/class12_scholarships/<int:student_id>')
def show_class12_scholarships(student_id):
    student = Student.query.get_or_404(student_id)
    if student.class_selected != "12":
        flash('This page is for Class 12th students only.', 'error')
        return redirect(url_for('homepage'))

    # Dummy data for scholarships/offers, will be replaced by DB queries
    # For example: scholarships = Scholarship.query.filter_by(applicable_class="12", eligibility_marks <= student.percentage).all()
    return render_template('class12_scholarships.html', lead=student) # 'lead' used in template

# CLI command to create initial DB tables
# @app.cli.command("init-db")
# def init_db_command():
#     """Creates the database tables."""
#     db.create_all()
#     print("Initialized the database.")

if __name__ == '__main__':
    # Ensure the app context is available for db operations if running directly
    # with app.app_context():
    #    db.create_all() # Creates tables if they don't exist, for development
    app.run(debug=True)


# +++++ STUDENT PANEL ROUTES +++++
from flask import session # Import session

@app.route('/student/login', methods=['GET', 'POST']) # Renamed to avoid conflict if a real 'login' is added
def student_login_attempt():
    if request.method == 'POST':
        email = request.form.get('email')
        if not email:
            flash('Email is required.', 'error')
            return redirect(url_for('student_login_attempt'))

        student = Student.query.filter_by(email=email).first()
        if student:
            session['student_id'] = student.id
            session['user_role'] = 'student' # For potential future role checks
            flash('Successfully logged in!', 'success')
            return redirect(url_for('student_dashboard'))
        else:
            flash('No student found with that email. Please register first.', 'error')
            return redirect(url_for('student_login_attempt'))

    # If already logged in, redirect to dashboard
    if 'student_id' in session and session.get('user_role') == 'student':
        return redirect(url_for('student_dashboard'))

    return render_template('student/login.html')

@app.route('/student/dashboard')
def student_dashboard():
    if 'student_id' not in session or session.get('user_role') != 'student':
        flash('Please log in to access the dashboard.', 'info')
        return redirect(url_for('student_login_attempt'))

    student = Student.query.get(session['student_id'])
    if not student:
        # This case should ideally not happen if session is managed well
        session.pop('student_id', None)
        session.pop('user_role', None)
        flash('Could not find your student profile. Please log in again.', 'error')
        return redirect(url_for('student_login_attempt'))

    return render_template('student/dashboard.html', student=student)

@app.route('/student/logout')
def student_logout():
    session.pop('student_id', None)
    session.pop('user_role', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('homepage'))


# +++++ COLLEGE PANEL ROUTES +++++

@app.route('/college/register', methods=['GET', 'POST'])
def college_register_attempt():
    if request.method == 'POST':
        college_name = request.form.get('college_name', '').strip()
        contact_email = request.form.get('contact_email', '').strip()
        logo_url = request.form.get('logo_url', '').strip()

        if not college_name or not contact_email:
            flash('College Name and Contact Email are required.', 'error')
            return redirect(url_for('college_register_attempt'))

        existing_college = College.query.filter_by(contact_email=contact_email).first()
        if existing_college:
            flash('A college with this contact email already exists.', 'error')
            return redirect(url_for('college_register_attempt'))

        existing_college_name = College.query.filter_by(name=college_name).first()
        if existing_college_name:
            flash('A college with this name already exists.', 'error')
            return redirect(url_for('college_register_attempt'))

        new_college = College(
            name=college_name,
            contact_email=contact_email,
            logo_url=logo_url if logo_url else None,
            is_approved=False # Requires admin approval
        )
        db.session.add(new_college)
        try:
            db.session.commit()
            flash('College registration submitted successfully! Your application will be reviewed by an admin.', 'success')
            # Maybe send an email to admin here
            return redirect(url_for('college_login_attempt'))
        except Exception as e:
            db.session.rollback()
            flash(f'Error during registration: {str(e)}', 'error')
            return redirect(url_for('college_register_attempt'))

    if 'college_id' in session and session.get('user_role') == 'college':
        return redirect(url_for('college_dashboard'))
    return render_template('college/register.html')

@app.route('/college/login', methods=['GET', 'POST'])
def college_login_attempt():
    if request.method == 'POST':
        contact_email = request.form.get('contact_email')
        if not contact_email:
            flash('Contact Email is required.', 'error')
            return redirect(url_for('college_login_attempt'))

        college = College.query.filter_by(contact_email=contact_email).first()

        if college:
            if college.is_approved:
                session['college_id'] = college.id
                session['user_role'] = 'college'
                flash('Successfully logged in!', 'success')
                return redirect(url_for('college_dashboard'))
            else:
                flash('Your college registration is pending approval. Please wait for admin confirmation.', 'warning')
                return redirect(url_for('college_login_attempt'))
        else:
            flash('No college found with that email. Please register first.', 'error')
            return redirect(url_for('college_login_attempt'))

    if 'college_id' in session and session.get('user_role') == 'college':
        return redirect(url_for('college_dashboard'))
    return render_template('college/login.html')

@app.route('/college/dashboard')
def college_dashboard():
    if 'college_id' not in session or session.get('user_role') != 'college':
        flash('Please log in to access the college dashboard.', 'info')
        return redirect(url_for('college_login_attempt'))

    college = College.query.get(session['college_id'])
    if not college or not college.is_approved: # Double check approval
        session.pop('college_id', None)
        session.pop('user_role', None)
        flash('Access denied or college not approved. Please log in again or contact admin.', 'error')
        return redirect(url_for('college_login_attempt'))

    # Fetch some leads for display (e.g., all Class 12th students for now, or more specific logic later)
    # This is a placeholder. Real lead access will be more complex (payments, filtering)
    leads = Student.query.filter_by(class_selected='12').order_by(Student.created_at.desc()).limit(10).all()

    return render_template('college/dashboard.html', college=college, leads=leads)

@app.route('/college/logout')
def college_logout():
    session.pop('college_id', None)
    session.pop('user_role', None) # Clear the role as well
    flash('You have been logged out from the College Portal.', 'success')
    return redirect(url_for('homepage'))
