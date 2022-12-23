from flask_cors import CORS
from flask import Flask
from english_words import english_words_set
import string
import pickle
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split



loaded_model = pickle.load(open("model.sav", 'rb'))
data = pd.read_csv("labeled_data.csv")
data["labels"] = data["class"].map({0: "Hate Speech", 1: "Offensive Language", 2: "No Hate and Offensive"})
data = data[["tweet", "labels"]]
import re
import nltk
nltk.download('stopwords')
stemmer = nltk.SnowballStemmer("english")
from nltk.corpus import stopwords
import string
stopword=set(stopwords.words('english'))

def clean(text):
    text = str(text).lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\n', '', text)
    text = re.sub('\w*\d\w*', '', text)
    text = [word for word in text.split(' ') if word not in stopword]
    text=" ".join(text)
    text = [stemmer.stem(word) for word in text.split(' ')]
    text=" ".join(text)
    return text
data["tweet"] = data["tweet"].apply(clean)
x = np.array(data["tweet"])
y = np.array(data["labels"])
cv = CountVectorizer()
X = cv.fit_transform(x)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)


def predict(inp):
	data = cv.transform([inp]).toarray()
	result = loaded_model.predict(data)
	return result[0]

app = Flask(__name__)
CORS(app)

@app.route('/isAbsurd/')
def fun1():
	return "0"

@app.route('/isAbsurd/<inp>')
def isAbsurd(inp):
	for  word in inp.split():
		word = word.translate(str.maketrans('', '', string.punctuation))
		word = word.lower()
		if not word in english_words_set and not word.isnumeric():
			return "1"
	return "0"
	

@app.route('/<inp>')
def fun2(inp):
	return predict(inp)
	 

@app.route('/')
def fun3():
	return ""

if __name__ == '__main__':
	app.run()
