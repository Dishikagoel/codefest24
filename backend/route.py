from flask import Flask, request
from flask_cors import CORS
import multiprocessing
import timeout_decorator
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load the environment variables from the .env file
load_dotenv()

app = Flask(__name__)

CORS(app)

def execute_code(code):
    try:
        exec(code, {"__name__": "__main__"})
    except Exception as e:
        return str(e)

def check_python_code(code):
    try:
        # Check if the code compiles
        compile(code, '<string>', 'exec')
    except SyntaxError as e:
        return "SyntaxError"

    # Set a timeout and execute the code
    try:
        process = multiprocessing.Process(target=execute_code, args=(code,))
        process.start()
        process.join(timeout=5)  # Adjust timeout as necessary
        if process.is_alive():
            process.terminate()
            process.join()
            return "Infinite"
    except timeout_decorator.timeout_decorator.TimeoutError:
        return "Infinite"
    except Exception as e:
        return f"Error"

    return "Success"


@app.route("/run", methods=["POST"])
def run():
    content = f"""{request.get_json()["code"]}"""
    return {"response": check_python_code(content)}

@app.route("/llm_api", methods=["POST"])
def llm_api():
    content = f"""Ok, so here is the question: {request.get_json()["question"]} and here is the answer: {request.get_json()["answer"]}. Given this context, please check if this answer is correct based on the question. If it is not, please provide the correct answer. You have to give the output in the format <Correct/Incorrect> <Correct Answer/Positive Feedback>. For example in: question: print hello world, answer: print("hello world"), the output should be: Correct Good Job!. If the answer is incorrect, the output should be: Incorrect The correct answer is print("hello world")."""
    # print("API Ky", os.getenv('OPENAI_API'))
    client = OpenAI(api_key=os.getenv('OPENAI_API'))
    response = client.chat.completions.create(model="ft:gpt-3.5-turbo-0125:personal::9GCHGPWm", messages=[{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": content}])
    msg = response.choices[0].message.content
    return {"response": msg.split(" ")[0], "feedback": " ".join(msg.split(" ")[1:])}


if __name__ == "__main__":
    app.run(port=3002, debug=True)