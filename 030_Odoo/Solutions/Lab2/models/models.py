from odoo import models, fields, api
from odoo.exceptions import ValidationError

class Department(models.Model):
    _name = 'hms.department'
    _description = 'Hospital Department'

    name = fields.Char(required=True)
    description = fields.Text()
    capacity = fields.Integer()
    state = fields.Selection([
        ('open', 'Open'),
        ('closed', 'Closed'),
    ], default='open', required=True)
    patients = fields.One2many('hms.patient', 'department_id', string='Patients')
    doctor_ids = fields.One2many('hms.doctor', 'department_id', string='Doctors')

class Doctor(models.Model):
    _name = 'hms.doctor'
    _description = 'Hospital Doctor'

    first_name = fields.Char(required=True)
    last_name = fields.Char(required=True)
    image = fields.Binary()
    department_id = fields.Many2one('hms.department', string='Department')

class Patient(models.Model):
    _name = 'hms.patient'
    _description = 'Hospital Patient'
    
    first_name = fields.Char(required=True)
    last_name = fields.Char(required=True)
    birth_date = fields.Date()
    age = fields.Integer(compute="_compute_age", store=True)

    state = fields.Selection(
        [
            ('undetermined', 'Undetermined'),
            ('good', 'Good'),
            ('fair', 'Fair'),
            ('serious', 'Serious'),
        ], default='undetermined', required=True)

    blood_type = fields.Selection([
        ('a+', 'A+'), ('a-', 'A-'),
        ('b+', 'B+'), ('b-', 'B-'),
        ('ab+', 'AB+'), ('ab-', 'AB-'),
        ('o+', 'O+'), ('o-', 'O-'),
    ])
    cr_ratio = fields.Float()
    pcr = fields.Boolean()
    image = fields.Binary()
    doctor_ids = fields.Many2many(
        'hms.doctor',
        string='Doctors',
        domain="[('department_id', '=', department_id)]",
    )

    address = fields.Text()
    history = fields.Html()
    department_capacity = fields.Integer(related='department_id.capacity', readonly=True)

    @api.depends('birth_date')
    def _compute_age(self):
        for rec in self:
            if rec.birth_date:
                birth = fields.Date.from_string(rec.birth_date)
                today = fields.Date.context_today(rec)
                rec.age = today.year - birth.year - ((today.month, today.day) < (birth.month, birth.day))
            else:
                rec.age = 0

    department_id = fields.Many2one('hms.department', string='Department')

    @api.onchange('birth_date')
    def _onchange_birth_date(self):
        warning = False
        for rec in self:
            age = 0
            if rec.birth_date:
                birth = fields.Date.from_string(rec.birth_date)
                today = fields.Date.context_today(rec)
                age = today.year - birth.year - ((today.month, today.day) < (birth.month, birth.day))
            if age < 30:
                rec.pcr = True
                warning = True
        if warning:
            return {
                'warning': {
                    'title': 'PCR Auto-Checked',
                    'message': 'PCR has been checked automatically because the patient is under 30.',
                }
            }

    @api.constrains('department_id')
    def _check_department_state(self):
        for rec in self:
            if rec.department_id and rec.department_id.state == 'closed':
                raise ValidationError('You cannot select a closed department.')

    @api.constrains('pcr', 'cr_ratio')
    def _check_cr_ratio_required_when_pcr(self):
        for rec in self:
            if rec.pcr and not rec.cr_ratio:
                raise ValidationError('CR ratio is required when PCR is checked.')