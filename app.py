from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def buscar():
    return render_template('index.html')

@app.route("/ver")
def ver():
    return render_template("ver.html")

@app.route("/editar")
def editar():
    return render_template("editar.html")

@app.route("/agregar")
def agregar():
    return render_template("agregar.html")

@app.route("/borrar")
def borrar():
    return render_template("borrar.html")
