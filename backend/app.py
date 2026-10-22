from flask import Flask, request, jsonify
import time


app = Flask(__name__)



@app.route("/api/chat", methods=["POST"])
def chat():
    time.sleep(1)
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")

    if not isinstance(message, str) or not message.strip():
        return jsonify({"error": "message is required"}), 400

    return jsonify({
        "response": f"Your message was: {message}"
        })

if __name__ == "__main__":
    app.run(debug=True, port=5001)
