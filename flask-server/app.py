# Flask import
from flask import Flask, jsonify, request
from werkzeug import exceptions
# Flask-cors import
from flask_cors import CORS
# JSONSchema lib import
from jsonschema import validate


# running Flask app and allow CORS
app = Flask(__name__)
CORS(app)

# schemas for validating json input request
deposit_schema = {
    'type': 'object',
    'properties': {
        'amount': {'type': 'integer'},
        'duration': {'type': 'integer'},
        'rate': {'type': 'number'}
    }
}


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
        percentages = data['amount'] * data['rate'] / 100 / 12 * data['duration']
        full_amount = data['amount'] + percentages
        return jsonify({
            'percentages': percentages,
            'fullAmount': full_amount
        })
    except Exception as e:  # catch error in app logic
        app.logger.error(str(e))
        return jsonify(code=500, error=str(e)), 500


@app.post('/api/credit')
def credit():
    return jsonify(code=501, error='Not Implemented'), 501
