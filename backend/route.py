from flask import Flask, request
import os
import json

app = Flask(__name__)


@app.route("/run", methods=["POST"])
def run():
    content = request.get_json()["code"]
    with open("code.py", "w") as f:
        f.writelines(content)
    os.system("sh execute.sh")
    os.system("rm -f code.py")
    with open("out.json") as f:
        resp = json.load(f)
    os.system("rm -f out.json")

    return resp

if __name__ == "__main__":
    app.run(port=5011, debug=True)