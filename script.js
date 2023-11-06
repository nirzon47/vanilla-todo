// Taking notes either from localStorage or initializing it
const notes = JSON.parse(localStorage.getItem('notes')) || []
// Checks if the user prefers dark mode, if they do, store dark, otherwise store light
const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
	? 'dark'
	: 'light'

// Gets the current theme from localStorage or prefers
let currentTheme = localStorage.getItem('theme') || preferred

// DOM elements
const addBtn = document.getElementById('add')
const currText = document.getElementById('current-text')
const savedNotes = document.getElementById('saved')
const colorPicker = document.getElementById('color-picker')
const container = currText.parentElement.parentElement
const remove = document.getElementsByClassName('fa-xmark')
const categorySelector = document.getElementById('category-selector')
const theme = document.getElementById('theme')

// Event Listeners
addBtn.addEventListener('click', () => {
	addNote()
})

colorPicker.addEventListener('input', () => {
	setColor(colorPicker.value)
})

document.addEventListener('DOMContentLoaded', () => {
	renderNotes()
	if (currentTheme === 'light') {
		theme.checked = true
		document.documentElement.setAttribute('data-theme', 'light')
	}
})

categorySelector.addEventListener('change', () => {
	renderNotes()
})

theme.addEventListener('click', () => {
	changeTheme()
})

// Functions

/**
 * Adds a note to the DOM and updates the local storage and rendered notes.
 *
 * @return {undefined} Does not return anything.
 */
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

/**
 * Removes a note from the DOM and updates the local storage and rendered notes.
 *
 * @param {Element} element - The element representing the note to be removed.
 * @return {undefined} There is no return value.
 */
const removeNote = (element) => {
	const id = element.parentElement.id
	deleteNote(id)
	updateLocalStorage()
	renderNotes()
}

/**
 * Iterates over the "remove" elements and adds a click event listener to each element.
 * When an element is clicked, it calls the "removeNote" function.
 *
 * @param {type} - No parameters
 * @return {type} - No return value
 */
const addRemoveListener = () => {
	Array.from(remove).forEach((element) => {
		element.addEventListener('click', () => {
			removeNote(element)
		})
	})
}

/**
 * Deletes a note from the notes array based on the provided ID.
 *
 * @param {number} id - The ID of the note to be deleted.
 */
const deleteNote = (id) => {
	const index = notes.findIndex((note) => note.id == id)
	notes.splice(index, 1)
}

/**
 * Updates the local storage with the current state of the notes array.
 *
 * @param {none} - This function does not accept any parameters.
 * @return {none} - This function does not return a value.
 */
const updateLocalStorage = () => {
	localStorage.setItem('notes', JSON.stringify(notes))
}

/**
 * Sets the background color of the container element based on the color input.
 *
 * @param {string} color - The color to set as the background color.
 */
const setColor = (color) => {
	container.style.backgroundColor = color
}

/**
 * Renders filtered notes by clearing the savedNotes element and
 * iterating over the notes array to generate HTML sections
 * for each note. Each section contains an ID, a mockup code,
 * and a category. The generated HTML is appended to the
 * savedNotes element. Finally, the addRemoveListener function
 * is called to attach event listeners for removing notes.
 *
 * @return {void} This function does not return anything.
 */
const renderNotes = () => {
	savedNotes.innerHTML = ''

	const activeCategory = categorySelector.value

	if (activeCategory === 'All') {
		renderNotesAll()
		return
	}

	notes.filter((note) => {
		if (note.category !== activeCategory) {
			return
		}

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

/**
 * Renders all notes by clearing the savedNotes element and
 * iterating over the notes array to generate HTML sections
 * for each note. Each section contains an ID, a mockup code,
 * and a category. The generated HTML is appended to the
 * savedNotes element. Finally, the addRemoveListener function
 * is called to attach event listeners for removing notes.
 *
 * @param None
 * @return None
 */
const renderNotesAll = () => {
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

/**
 * Toggles the theme between light and dark.
 *
 * @param {none}
 * @return {none}
 */
const changeTheme = () => {
	if (currentTheme === 'light') {
		currentTheme = 'dark'
		document.documentElement.setAttribute('data-theme', 'dark')
	} else {
		currentTheme = 'light'
		document.documentElement.setAttribute('data-theme', 'light')
	}

	localStorage.setItem('theme', currentTheme)
}
