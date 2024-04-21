import json

from flask import Flask, request, jsonify
from flask_cors import CORS
import multiprocessing
import timeout_decorator
from openai import OpenAI
from dotenv import load_dotenv
import os
from io import StringIO
from contextlib import redirect_stdout

# Load the environment variables from the .env file
load_dotenv()

app = Flask(__name__)

CORS(app)

def execute_code(code):
    try:
        f = StringIO()
        with redirect_stdout(f):
            exec(code, {"__name__": "__main__"})
        return f.getvalue()
    except Exception as e:
        return str(e)

def check_python_code(code):
    global output
    try:
        # Check if the code compiles
        compile(code, '<string>', 'exec')
    except SyntaxError as e:
        print("Syntax Error")
        print(str(e))
        return {"Status":"SyntaxError", "Message":str(e)}

    # Set a timeout and execute the code
    try:
        process = multiprocessing.Process(target=execute_code, args=(code,))
        process.start()
        process.join(timeout=5)  # Adjust timeout as necessary
        if process.is_alive():
            process.terminate()
            process.join()
            return {"Status": "Infinite", "Message": "Compile Timeout Error, please check for infinite loops"}
    except timeout_decorator.timeout_decorator.TimeoutError:
        return {"Status": "Infinite", "Message": "Compile Timeout Error, please check for infinite loops"}
    except Exception as e:
        return {"Status":"SyntaxError", "Message":e}
    return {"Status":"Success","Message" : execute_code(code)}


@app.route("/run", methods=["POST"])
def run():
    content = f"""{request.get_json()["code"]}"""
    print(content)
    res = check_python_code(content)
    print(f"Res")
    print(res)
    return res

@app.route("/llm_api", methods=["POST"])
def llm_api():
    content = f"""Ok, so here is the question: {request.get_json()["question"]} and here is the answer: {request.get_json()["answer"]}. Given this context, please check if this answer is correct based on the question. If it is not, please provide the correct answer. You have to give the output in the format <Correct/Incorrect> <Correct Answer/Positive Feedback>. For example in: question: print hello world statement, answer: print("hello world"), the output should be: Correct Good Job!. If the answer is incorrect, the output should be: Incorrect The correct answer is print("hello world")."""
    # print("API Ky", os.getenv('OPENAI_API'))
    client = OpenAI(api_key=os.getenv('OPENAI_API'))
    response = client.chat.completions.create(model="ft:gpt-3.5-turbo-0125:personal::9GCHGPWm", messages=[{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": content}])
    msg = response.choices[0].message.content
    return {"response": msg.split(" ")[0], "feedback": " ".join(msg.split(" ")[1:])}

@app.route("/llm_chatbot", methods=["POST"])
def llm_chatbot_msg():
    client = OpenAI(api_key=os.getenv('OPENAI_API'))
    response = client.chat.completions.create(model="ft:gpt-3.5-turbo-0125:personal::9GCHGPWm", messages=[{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": request.get_json()["message"]}])
    msg = response.choices[0].message.content
    return {"feedback": msg}


if __name__ == "__main__":
    app.run(port=3002, debug=True)