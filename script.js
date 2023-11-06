// Taking notes either from localStorage or initializing it
const notes = JSON.parse(localStorage.getItem('notes')) || []

// DOM elements
const addBtn = document.getElementById('add')
const currText = document.getElementById('current-text')
const savedNotes = document.getElementById('saved')
const colorPicker = document.getElementById('color-picker')
const container = currText.parentElement.parentElement
const remove = document.getElementsByClassName('fa-xmark')

// Event Listeners
addBtn.addEventListener('click', () => {
	addNote()
})

colorPicker.addEventListener('input', () => {
	setColor(colorPicker.value)
})

document.addEventListener('DOMContentLoaded', () => {
	renderNotes()
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
		id: Date.now(),
		text: currText.value,
		bg: container.style.backgroundColor,
		category: category,
	})
	currText.value = ''

	updateLocalStorage()
	renderNotes()
}

const removeNote = (element) => {
	const id = element.parentElement.id
	deleteNote(id)
	updateLocalStorage()
	renderNotes()
}

const addRemoveListener = () => {
	Array.from(remove).forEach((element) => {
		element.addEventListener('click', () => {
			removeNote(element)
		})
	})
}

const deleteNote = (id) => {
	const index = notes.findIndex((note) => note.id == id)
	notes.splice(index, 1)
}

const updateLocalStorage = () => {
	localStorage.setItem('notes', JSON.stringify(notes))
}

const setColor = (color) => {
	container.style.backgroundColor = color
}

const renderNotes = () => {
	savedNotes.innerHTML = ''

	notes.forEach((note) => {
		savedNotes.innerHTML += `<section id="${note.id}" class="mockup-code w-max mx-auto h-64 mb-4 relative" style="background-color: ${note.bg}">
                                    <i class="fa-solid fa-xmark absolute top-5 right-5 hover:text-red-500 duration-300 cursor-pointer"></i>
                                    <div class="flex flex-col justify-between h-full p-4">
                                        <textarea
                                            class="bg-transparent resize-none outline-none font-mono ml-3"
                                            rows="10"
                                            cols="10"
                                            maxlength="120"
                                            disabled
                                        >
                                            ${note.text}
                                        </textarea>
                                        <p class="font-bold text-center">${note.category}</p>
                                    </div>
                                </section>`
	})

	addRemoveListener()
}
