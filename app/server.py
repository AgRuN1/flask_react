from time import time

from flask import Flask, render_template, session

from config import FLASK_CONFIG as config, DEBUG
from api import api_func

app = Flask(__name__, **config)

app.secret_key = 'fjsdklfjsdklfjsdklf'

@app.route('/')
@app.route('/about')
def index() -> str:
	if 'user' in session:
		user = session['user']
	else: 
		user = 0
	if DEBUG:
		return render_template('index.test.html', user=user, time=time())
	else:
		return render_template('index.html', user=user)

app.add_url_rule('/api', view_func=api_func)

@app.route('/404')
@app.errorhandler(404)
def page_not_found(e=None):
	return render_template('404.html'), 404

if __name__ == '__main__':
	app.run(debug=DEBUG)