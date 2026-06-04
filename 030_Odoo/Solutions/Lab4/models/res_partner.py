from odoo import models, fields, api
from odoo.exceptions import ValidationError

class ResPartner(models.Model):
    _inherit = 'res.partner'  

    related_patient_id = fields.Many2one(
        comodel_name='hms.patient', 
        string='Related Patient'
    )
    
    @api.constrains('related_patient_id')
    def _check_patient_not_already_linked(self):
      for partner in self:
        if partner.related_patient_id:
            duplicate = self.search([
                ('related_patient_id', '=', partner.related_patient_id.id),
                ('id', '!=', partner.id)
            ], limit=1)
            if duplicate:
                raise ValidationError("Cannot link this patient! '%s' is already linked to customer '%s'."% (partner.related_patient_id.first_name, duplicate.name))