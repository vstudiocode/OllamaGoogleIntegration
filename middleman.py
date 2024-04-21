import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

LLAMA_SERVER_URL = 'http://localhost:11434/api/generate'

@app.route('/api/generate', methods=['POST'])
def generate_response():
    request_data = request.json
    prompt = request_data.get('prompt')
    
    llama_data = {
        "model": "llama3:8b",
        "prompt": prompt,
        "stream": False
    }
    
    response = requests.post(LLAMA_SERVER_URL, json=llama_data)
    
    llama_response = response.json()["response"]
    print(llama_response)
    return jsonify({"response": llama_response})

if __name__ == '__main__':
    app.run(debug=True, port=5050)
