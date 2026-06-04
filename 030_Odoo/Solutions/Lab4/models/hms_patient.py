import re
from odoo import models, fields, api
from datetime import date
from odoo.exceptions import ValidationError 

class HmsPatient(models.Model):
    _name = 'hms.patient'
    _description = 'Hospital Patient Record'
    _rec_name = 'first_name'

    first_name = fields.Char(string='First Name', required=True)
    last_name = fields.Char(string='Last Name', required=True)
    birth_date = fields.Date(string='Birth Date')
    history = fields.Html(string='Medical History')
    cr_ratio = fields.Float(string='CR Ratio')
    blood_type = fields.Selection([
        ('a+', 'A+'), ('a-', 'A-'), ('b+', 'B+'), ('b-', 'B-'),
        ('ab+', 'AB+'), ('ab-', 'AB-'), ('o+', 'O+'), ('o-', 'O-')
    ], string='Blood Type')

    pcr = fields.Boolean(string='PCR Positive?')
    image = fields.Binary(string='Patient Image')
    address = fields.Text(string='Address')
    email = fields.Char(string='Email')
    age = fields.Integer(string='Age', compute='_compute_age', store=True)

    state = fields.Selection([
        ('undetermined', 'Undetermined'),
        ('good', 'Good'),
        ('fair', 'Fair'),
        ('serious', 'Serious')
    ], string='Status', default='undetermined')

    department_id = fields.Many2one(
        comodel_name='hms.department', 
        string='Department',
        domain=[('is_opened', '=', True)]  
    )
    
    department_capacity = fields.Integer(
        related='department_id.capacity', 
        string='Department Capacity'
    )
    
    doctor_ids = fields.Many2many(comodel_name='hms.doctor', string='Doctors')

    @api.depends('birth_date')
    def _compute_age(self):
        for rec in self:
            if rec.birth_date:
                today = date.today()
                rec.age = today.year - rec.birth_date.year - ((today.month, today.day) < (rec.birth_date.month, rec.birth_date.day))
            else:
                rec.age = 0


    @api.constrains('email')
    def _check_valid_email(self):
        for rec in self:
            if rec.email:
                email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
                if not re.match(email_regex, rec.email):
                    raise ValidationError("The email address provided (%s) is invalid. Please use a standard format (e.g., example@domain.com)." % rec.email)

    
    _sql_constraints = [
        ('unique_patient_email', 'UNIQUE(email)', 'This email address is already registered to another patient record!')
    ]

    @api.onchange('age')
    def _onchange_age(self):
        if self.age and self.age < 30:
            self.pcr = True
            return {
                'warning': {
                    'title': 'Automated PCR Validation Check',
                    'message': 'Patient age is under 30. The PCR checkbox field has been auto-selected.',
                }
            }