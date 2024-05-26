import os
import time
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    organization=os.getenv("ORGANZATION"),
    # project=os.getenv("PROJECT"),  # use this only if your openAI-project is not the default project!
    api_key=os.getenv("API_KEY"),
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define the /api route to handle POST requests
@app.route("/api", methods=["POST"])
def api():
    message = request.json.get("message")
    print("Received message:", message)

    # Measure the start time
    start_time = time.time()

    # Send the message to OpenAI's API and receive the response
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message},
        ],
    )

    # Measure the end time
    end_time = time.time()

    if completion.choices[0].message is not None:
        response_text = completion.choices[0].message.content
        print("Response:", response_text)

        # Calculate the backend processing time
        backend_processing_time = end_time - start_time
        print("Backend processing time:", backend_processing_time)
        
        # Write timings to a CSV file
        with open('timings.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([message, backend_processing_time])

        return jsonify(response_text)
    else:
        return jsonify('Failed to generate response!')

if __name__ == '__main__':
    app.run(debug=True)
