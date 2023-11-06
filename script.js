// Taking notes either from localStorage or initializing it
const notes = JSON.parse(localStorage.getItem('notes')) || []

// DOM elements
const addBtn = document.getElementById('add')
const currText = document.getElementById('current-text')
const savedNotes = document.getElementById('saved')
const colorPicker = document.getElementById('color-picker')
const container = currText.parentElement.parentElement

// Event Listeners
addBtn.addEventListener('click', () => {
	addNote()
})

colorPicker.addEventListener('input', () => {
	setColor(colorPicker.value)
})

// Functions
const addNote = () => {
	if (!currText.value) {
		return
	}

	const category = document.querySelector(
		'input[name="category"]:checked'
	).value

	notes.push({
		text: currText.value,
		bg: container.style.backgroundColor,
		category: category,
	})
	currText.value = ''

	updateLocalStorage()
}

const updateLocalStorage = () => {
	localStorage.setItem('notes', JSON.stringify(notes))
}

const setColor = (color) => {
	container.style.backgroundColor = color
}
