from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    if data is None or 'domain' not in data:
        return jsonify({'error': 'Invalid request format'}), 400

    domain = data['domain']

    # Dummy analysis, replace with actual implementation
    # In real application, you'll analyze the traffic for the given domain
    # For now, just return some dummy data
    analysis_result = {
        'Domain': domain,
        'Total Requests': 1000,
        'Total Bytes': '10 MB',
        'Most Common Protocols': ['HTTP', 'HTTPS', 'DNS'],
        'Top Source IPs': ['192.168.1.1', '192.168.1.2', '192.168.1.3']
    }
    return jsonify(analysis_result)

if __name__ == '__main__':
    app.run(debug=True)
