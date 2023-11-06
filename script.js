// Taking notes either from localStorage or initializing it
const notes = localStorage.getItem('notes') || []

// DOM elements
const addBtn = document.getElementById('add')
const currText = document.getElementById('current-text')
const savedNotes = document.getElementById('saved')

// Event Listeners
addBtn.addEventListener('click', () => {
	addNote()
})

// Functions
const addNote = () => {
	notes.push({ text: currText.value })
	console.log(notes)
}
