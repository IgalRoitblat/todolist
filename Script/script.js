console.log('script works!');

var form = document.querySelector('form');
var notesContainer = document.querySelector('.notes-container');
var dateInput = form.querySelector('[name=due-date]');
var backup = localStorage.getItem('notes');

if (backup) {
	var notes = JSON.parse(backup);
} else {
	var notes = [
	{content:'Lorem ipsum dasdasdolor sit amet, consectetur adipisicing elit. Error natus, distinctio voluptate vel et aspernatur eligendi. Consequuntur enim quam delectus nulla reprehenderit, esse, illum animi voluptatem ab nemo expedita in.' , date:'2018-01-23', time:'18:30' },
	{content:'Lorem ipsum dasdasdsadasdasdaolor sit amet, consectetur adipisicing elit. Error natus, distinctio voluptate vel et aspernatur eligendi. Consequuntur enim quam delectus nulla reprehenderit, esse, illum animi voluptatem ab nemo expedita in.' , date:'2018-02-13', time:'18:30' },
	{content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error natus, distinctio voluptate vel et aspernatur eligendi. Consequuntur enim quam delectus nulla reprehenderit, esse, illum animi voluptatem ab nemo expedita in.' , date:'2018-06-26', time:'18:30' },
	];
}

clearNotesContainer();
createNotes(notes);

form.addEventListener('submit', onFormSubmit);
dateInput.addEventListener('change', removeErrMessage);

function onFormSubmit(event) {
	event.preventDefault();
	//var test = new RegExp(/^[a-z]+\w+$/);
	//console.log(test.test(document.querySelector('textarea').value));
	var isDateValid = Number(new Date(form.querySelector('[name=due-date]').value)) > Date.now();

	if (!isDateValid) {
		createErrMessage();
		var errMsg = document.querySelector('.error');

		errMsg.textContent = 'Please enter a valid date';
	} else {
			createNoteObject();
			clearNotesContainer();
			createNotes(notes);
			console.log(notes);
		}
}

function createNoteObject() {
	var content = form.querySelector('[name=task-content]');
	var date = form.querySelector('[name=due-date]');
	var time = form.querySelector('[name=due-time]');

	notes.push({content: content.value, date: date.value, time: time.value});
	localStorage.setItem('notes', JSON.stringify(notes));

	content.value = '';
	date.value = '';
	time.value = '';
}

function createErrMessage() {
	var dateFieldset = document.querySelector('#date-and-time');
	var errMesg = document.createElement('span');
	dateFieldset.append(errMesg);
	errMesg.classList.add('error');
}

function removeErrMessage() {
	var errorMessage = document.querySelector('.error');
	if (errorMessage) errorMessage.parentNode.removeChild(errorMessage);
}

function createNotes(notes) {
	for (var i = 0; i < notes.length; i++) {
		createNote(notes[i]);
	}
}

function clearNotesContainer() {
	var main = document.querySelector('main');
	var notesContainer = document.querySelector('.notes-container');
	notesContainer.parentNode.removeChild(notesContainer);

	var notesContainer = document.createElement('div');
	notesContainer.classList.add('notes-container');
	main.append(notesContainer);
} 

function createNote(note) {
	var notesContainer = document.querySelector('.notes-container')
	var newNote = document.createElement('div');
	var actionsContainer = document.createElement('div');
	var removeBtn = document.createElement('div');
	var noteContent = document.createElement('div');
	var dateAndTimeContainer = document.createElement('div');
	var removeBtnContent = document.createElement('span');
	var dateContent = document.createElement('span');
	var timeContent = document.createElement('span');

	var dateConvert = new Date(note.date);

	newNote.classList.add('note');
	actionsContainer.classList.add('actions-container');
	removeBtn.classList.add('remove-note');
	noteContent.classList.add('note-content');
	dateAndTimeContainer.classList.add('note-date-and-time');

	noteContent.textContent = note.content;
	dateContent.textContent = dateConvert.getDate() + '/' + (dateConvert.getMonth() + 1) + '/' + dateConvert.getFullYear();
	timeContent.textContent = note.time;
	removeBtnContent = '\u00D7';

	notesContainer.append(newNote);
	newNote.append(actionsContainer, noteContent, dateAndTimeContainer);
	actionsContainer.append(removeBtn);
	removeBtn.append(removeBtnContent);
	dateAndTimeContainer.append(dateContent, timeContent);

	removeBtn.addEventListener('click', deleteNote);

	requestAnimationFrame(function () {
		newNote.classList.add('fade');
	});

}

function deleteNote(event) {
	var deleteBtn = event.target;
	var note = deleteBtn.parentNode.parentNode;

	var allNotes = document.querySelectorAll('.note');

	//var index = array.from(allNotes).indexOf(note);

	for (var i = 0; i < allNotes.length; i++) {
		if (allNotes[i] === note) {
			break;
		}
	}
	notes.splice(i, 1);
	localStorage.setItem('notes', JSON.stringify(notes));
	console.log(notes);
	removeNoteDOM(note);
}

function removeNoteDOM(note) {
	var notesContainer = document.querySelector('.notes-container');

	notesContainer.removeChild(note);
}

