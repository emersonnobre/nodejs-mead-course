const fs = require('fs')
const { success, error, } = require('./util/logger')

const notesFilepath = './notes.json'

function addNote(title, body) {
    const notes = loadData(notesFilepath)
    const noteAlreadyExists = notes.find(note => note.title === title)
    debugger
    if (noteAlreadyExists) {
        error('This title already was chosen')
        return
    }
    notes.push({
        title,
        body
    })
    saveData(notesFilepath, notes)
    success('New note added')
}

function removeNote(title) {
    const notes = loadData(notesFilepath)
    const notesUpdated = notes.filter(note => note.title !== title)
    if (notesUpdated.length === notes.length) {
        error('This note was not found')
        return
    }
    saveData(notesFilepath, notesUpdated)
    success('Note has been removed')
}

function listNotes() {
    const notes = loadData(notesFilepath)
    success('Your notes')
    notes.forEach(note => console.log(note.title))
}

function readNote(title) {
    const notes = loadData(notesFilepath)
    const note = notes.find(note => note.title === title)
    note ? console.log(note) : error('This note was not found')
}

function saveData(filepath, data) {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync(filepath, dataJSON)
}

function loadData(filepath) {
    try {
        const dataBuffer = fs.readFileSync(filepath)
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data 
    } catch (error) {
        return []
    }
}

module.exports = {
    listNotes,
    addNote,
    removeNote,
    readNote,
}