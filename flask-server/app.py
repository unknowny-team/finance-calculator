# Flask import
from flask import Flask, jsonify, request
# Flask-cors import
from flask_cors import CORS
# JSONSchema lib import
from jsonschema import validate
# werkzeug import (Flask builtin)
from werkzeug import exceptions

# running Flask app and allow CORS
app = Flask(__name__)
CORS(app)

# schemas for validating json input request
deposit_schema = {'type': 'object', 'properties': {'amount': {'type': 'integer'}, 'duration': {'type': 'integer'},
                                                   'rate': {'type': 'number'}},
                  'required': ['amount', 'duration', 'rate']}
credit_schema = {'type': 'object', 'properties': {'amount': {'type': 'integer'}, 'duration': {'type': 'integer'},
                                                  'rate': {'type': 'number'}, 'isDifferentiated': {'type': 'boolean'}},
                 'required': ['amount', 'duration', 'rate', 'isDifferentiated']}


# handle 404 error and make a pass
@app.errorhandler(exceptions.NotFound)
def page_not_found(error):
    return "404: Page not found!", 404


@app.post('/api/deposit')
def deposit():
    # validate request data
    try:
        if not request.is_json or not request.content_type == 'application/json':
            raise Exception('Not JSON format')
        data = request.json
        validate(data, schema=deposit_schema)
    except Exception as e:  # catch errors that causes on validation
        app.logger.warning(str(e))
        return jsonify(code=400, error=str(e)), 400

    # calculate simple percents
    try:
        percentages = data['amount'] * data['rate'] / 100 * data['duration'] / 12
        full_amount = data['amount'] + percentages
        return jsonify({'percentages': percentages, 'fullAmount': full_amount})
    except Exception as e:  # catch error in app logic
        app.logger.error(str(e))
        return jsonify(code=500, error=str(e)), 500


@app.post('/api/credit')
def credit():
    # validate request data
    try:
        if not request.is_json or not request.content_type == 'application/json':
            raise Exception('Not JSON format')
        data = request.json
        validate(data, schema=credit_schema)
    except Exception as e:  # catch errors that causes on validation
        app.logger.warning(str(e))
        return jsonify(code=400, error=str(e)), 400

    # calculate credit percents (using simple percents)
    try:
        percentages = []
        monthly_fee = []
        credit_sum = data['amount'] / data['duration']
        if data['isDifferentiated']:
            for i in range(data['duration']):
                d = data['duration'] - i
                p = credit_sum * data['rate'] / 100 * d / 12
                full = credit_sum + p
                monthly_fee.append(full)
                percentages.append(p)
        else:
            percentages = data['amount'] * data['rate'] / 100 * data['duration'] / 12
            monthly_fee = (data['amount'] + percentages) / data['duration']

        return jsonify({'percentages': percentages, 'monthlyFee': monthly_fee})
    except Exception as e:  # catch error in app logic
        app.logger.error(str(e))
        return jsonify(code=500, error=str(e)), 500
