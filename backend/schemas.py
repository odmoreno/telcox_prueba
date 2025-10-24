from marshmallow import Schema, fields

class ConsumptionResponseSchema(Schema):
    
    id = fields.Integer(dump_only=True)
    client_name = fields.String(required=True)
    balance = fields.Float(required=True)
    currency = fields.String(required=True)
    data_used = fields.Float(required=True)
    data_total = fields.Float(required=True)
    data_unit = fields.String(required=True)
    minutes_used = fields.Float(required=True)
    minutes_total = fields.Float(required=True)
    minutes_unit = fields.String(required=True)


class ErrorResponseSchema(Schema):

    code = fields.String()
    status = fields.String()
    message = fields.String(required=True)