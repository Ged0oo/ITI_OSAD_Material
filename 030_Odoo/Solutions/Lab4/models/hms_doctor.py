from odoo import models, fields

class HmsDoctor(models.Model):
    _name = 'hms.doctor'
    _description = 'Hospital Doctor'
    _rec_name = 'first_name'

    first_name = fields.Char(string='First Name', required=True)
    last_name = fields.Char(string='Last Name', required=True)
    image = fields.Binary(string='Doctor Image')

    def _compute_display_name(self):
        for rec in self:
            rec.display_name = f"Dr. {rec.first_name} {rec.last_name}"