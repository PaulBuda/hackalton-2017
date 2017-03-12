import json
with open('Capital.json') as data_file:    
    capitalQuestions = json.load(data_file)

newCapitalQuestions = {}
allCapitals = []
for item in capitalQuestions:
	# print item
	if 'a' in item:
		newCapitalQuestions[item['q']] = item['a']
		allCapitals.append(item['a'])

def getNewCapitalQuestions():
	return newCapitalQuestions

def getAllCapitals():
	return allCapitals

with open('Language-Multiple.json') as data_language:
	languageQuestions = json.load(data_language)

newLanguageQuestions = {}
allLanguages = [];
for item in languageQuestions:
	if 'a' in item:
		newLanguageQuestions[item['q']] = item['a']
		allLanguages.append(item['a'])

def getNewLanguageQuestions():
	return newLanguageQuestions

def getAllLanguages():
	return allLanguages

with open('Currency-Multiple.json') as data_currency:
	currencyQuestions = json.load(data_currency)

newCurrencyQuestions = {}
allCurrencies = []
for item in currencyQuestions:
	if 'a' in item:
		newCurrencyQuestions[item['q']] = item['a']
		allCurrencies.append(item['a'])

def getNewCurrencyQuestions():
	return newCurrencyQuestions

def getAllCurencies():
	return allCurrencies

with open('InternetTLD-Multiple.json') as data_internetTLD:
	internetTldQuestions = json.load(data_internetTLD)

newInternetTldQuestion = {}
allInternetTlds = []

for item in internetTldQuestions:
	if 'a' in item:
		newInternetTldQuestion[item['q']] = item['a']
		allInternetTlds.append(item['a'])

def getallInternetTldQuestions():
	return newInternetTldQuestion

def getallInternetTlds():
	return allInternetTlds
