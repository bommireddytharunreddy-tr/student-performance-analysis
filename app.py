@app.route("/")
def home():
    return "Student Performance Backend Running Successfully"
from flask import Flask, jsonify
from flask_cors import CORS
from analysis import get_student_data

app = Flask(__name__)
CORS(app)

@app.route("/students", methods=["GET"])
def students():
    data = get_student_data()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)