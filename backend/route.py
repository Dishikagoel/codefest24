from flask import Flask, request
from flask_cors import CORS
import multiprocessing
import timeout_decorator

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
        return "Syntax error in the code"

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

if __name__ == "__main__":
    app.run(port=3002, debug=True)