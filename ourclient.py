from matrix_client.api import MatrixHttpApi
from matrix_client.client import MatrixClient
import signal
import sys
import time
import logging
import thread
from random import randint
from random import shuffle
from random import sample
from multiprocessing import Process

PREFIX = "!"

execfile("questions.py")
capitalQuestions = getNewCapitalQuestions()
# print capitalQuestions
allCapitals = getAllCapitals()

print "Castries" in allCapitals

questions = {
	"What is the capital of France?" : "paris",
	"What is the capital of Portugal?" : "lisbon",
	"In what country you can find Tokyo?" : "japan"
}

currentQuestion = ""
answered = False
active = False
hasWon = False
activeUsers = {}
score = {}
# sync_token = None
multipleSelectQuestion = False
mSelectQuestions = []

options = ["a", "b", "c", "d"]
questionQueue = []

def makeQuestion():
	global currentQuestion
	global mSelectQuestions
	mSelectQuestions = []
	population = len(capitalQuestions.keys()) - 1
	rand = randint(0, population)
	while rand in questionQueue:
		rand = randint(0, len(capitalQuestions.keys()) - 1)
	currentQuestion = capitalQuestions.keys()[rand]
	questionQueue.append(rand)
	global multipleSelectQuestion
	rand2 = randint(0, 2)
	if rand2 > 1:
		multipleSelectQuestion = True
		while True:
			alt1, alt2, alt3 = sample(range(population + 1), 3)
			if alt1 != rand and alt2 != rand and alt3 != rand:
				break
		dem_keyz = capitalQuestions.keys()
		mSelectQuestions = [capitalQuestions[dem_keyz[alt1]], capitalQuestions[dem_keyz[alt2]], capitalQuestions[dem_keyz[alt3]], capitalQuestions[currentQuestion]]
		print mSelectQuestions
		shuffle(mSelectQuestions)




def signal_handler(signal, frame):
	if token:
		# room.send_text("Adios")
		client.logout()
		print "Bot's out"
	sys.exit(0)

def pretty_print(scores, room):
	keylist = scores.keys()
	keylist.sort()
	print keylist
	for index,key in enumerate(keylist):
	    room.send_text(str(index+1) + " " + key + " " + str(scores[key]))

def on_message(room, event):
	if event["type"] == "m.room.message" and event["sender"] != "@triviabot:matrix.org":
		if event["content"]["msgtype"] == "m.text":
			msg = event["content"]["body"]
			print event["sender"]
			print msg
			if msg.startswith(PREFIX):
				command = msg[1:].split("_");
				if(command[0] != "start"):
					room.send_text("Usage: !start_<nr_of_questions>");
				else:
					global active
					if active == False:
						active = True
						global activeUsers
						global score
						score = {}
						activeUsers = room.get_joined_members()
						print activeUsers
						del activeUsers["@triviabot:matrix.org"]
						for k,v in activeUsers.iteritems():
							score[k] = 0
						thread.start_new_thread(contest, (int(command[1]), room, ))


			else:
				try:
					global answered
					global multipleSelectQuestion
					global currentQuestion
					# print options
					# print options[mSelectQuestions.index(capitalQuestions[currentQuestion])]
					# print capitalQuestions[currentQuestion]
					if (msg.lower() == capitalQuestions[currentQuestion].encode("utf-8").lower() or (multipleSelectQuestion == True and msg.lower() == options[mSelectQuestions.index(capitalQuestions[currentQuestion].encode('utf-8'))])) and active == True and answered == False:
						global hasWon
						hasWon = True
						answered = True
						print "I AM HEREEERE"
						winner = event["sender"]
						# print winner
						room.send_text("The winner is " + winner)
						score[winner] += 5
						hasWon = False
						multipleSelectQuestion = False
						# active = False
				except KeyError, e:
					print "whatever keyError exception"

def contest(nrQuestions, room):
	room.send_text("Welcome to the trivia contest. There will be " + str(nrQuestions) + " questions. You have 10 seconds to answer each question. The winner gets +5 points. Whoever has the most points at the end wins the contest. Prepare yourselves.")
	global answered
	global multipleSelectQuestion
	multipleSelectQuestion = False
	answered = False
	global currentQuestion
	time.sleep(4) 
	for x in xrange(0, nrQuestions):
		answered = False
		makeQuestion()
		while(hasWon == True): pass
		
		if multipleSelectQuestion == True:
			altAnswers = unicode("")
			altAnswers += "Q" + str(x+1) + ": " + currentQuestion + "\n"
			for i in xrange(0, 4):
				altAnswers += options[i].encode("utf-8") + ". " + mSelectQuestions[i].encode("utf-8") + "\n"
			room.send_text(altAnswers)
		else:
			response = room.send_text("Q" + str(x+1) + ": " + currentQuestion)

		# thread.start_new_thread(startCount, (0, ))
		start = time.time()
		elapsed = 0
		while elapsed < 10:
			elapsed = time.time() -  start
			if answered == True:
				break
		if answered == False:
			room.send_text("Time is up! No correct answer was given.\n" + "Correct answer was <" + capitalQuestions[currentQuestion] + ">")
			# room.send_text("Correct answer was <" + questions[currentQuestion] + ">")
		time.sleep(2)
	global active
	active = False
	pretty_print(score, room)


def parse_room(room_id, state):
	# global sync_token
	# sync_token = sync_result["next_batch"]
	# rooms = sync_result["rooms"]["invite"]
	# for room_id in rooms:
	Process(target=endless_room, args=(room_id, )).start()



def endless_room(room_id):
	room = client.join_room(room_id);
	response = room.send_text("Trivia Bot is here")
	# response = room.send_image("the_image.png")
	room.add_listener(on_message)
	client.start_listener_thread()
	while True: pass


# response = room.send_text("Prepare yourselves! You have 15 seconds to answer the following question:")
# currentQuestion = questions.keys()[0]
# response = room.send_text(currentQuestion)
# time.sleep(14.7)
# client.logout()
logging.basicConfig(level=logging.WARNING)
client = MatrixClient("https://matrix.org");
token = client.login_with_password(username="triviaBOT", password="triviapass")
rooms = client.get_rooms()
# print rooms
for room_id in rooms.keys():
	parse_room(room_id, None)
client.add_invite_listener(parse_room)
# print "I am here"
# client.add_invite_listener(parse_room)
client.start_listener_thread()
# time.sleep(5)
# client.stop_listener_thread()
# room = client.join_room("#trivia_contest:matrix.org");
# response = room.send_text("Trivia Bot is here")
# time.sleep(5)

# signal.signal(signal.SIGINT, signal_handler)
while True: pass
	# j = MatrixHttpApi.sync(timeout_ms=30000, since=sync_token)
	# parse_sync(j)

# room.add_listener(on_message)
# client.start_listener_thread()

