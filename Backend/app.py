import os
from flask import Flask, render_template, request
from openai import OpenAI
from dotenv import load_dotenv, dotenv_values

load_dotenv()

print(os.getenv("API_KEY"))
print(os.getenv("ORGANIZATION"))

client = OpenAI(
  organization=os.getenv("ORGANZATION"),
  #project=os.getenv("PROJECT"),
  api_key=os.getenv("API_KEY"),
)


app = Flask(__name__, template_folder="../Frontend")

# Define the route to return the index.html file
@app.route("/")
def index():
    # Specify the path to the index.html file relative to the frontend directory
    return render_template("index.html")

# Define the /api route to handle POST requests
@app.route("/api", methods=["POST"])
def api():
    message = request.json.get("message")
    print(message)

    # Send the message to OpenAI's API and receive the response
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": message},
        ],
    )
    if completion.choices[0].message is not None:
        response_text = completion.choices[0].message.content
        return response_text
    else :
        return 'Failed to generate response!'
    
if __name__=='__main__':
    app.run(debug=True)