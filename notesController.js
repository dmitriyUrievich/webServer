const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const notesPath = path.join(__dirname,'db.json')

async function addNote (title) {
  // const notes = await fs.readFile(notesPath,encoding='utf-8')
  // const buffer = Buffer.from(notes).toString('utf-8')
  const notes = await getNote()
  const note = {
    title,
    id: Date.now().toString()
  }
notes.push(note)
  await saveNotes(notes);
  console.log(chalk.bgGreen('Note was added'))
}

async function getNote () {
  const notes = await fs.readFile(notesPath,encoding='utf-8')
  return Array.isArray(JSON.parse(notes))?JSON.parse(notes):[]
}

async function printNotes(){
const notes = await getNote()
  console.log(chalk.bgBlue('List of notes'))
    notes.forEach(note=>console.log(chalk.blue(note.id,note.title)))
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
async function removeNotes(id){
  const notes = await getNote()
  const newNotes = notes.filter(x =>x.id !== id)
  console.log(chalk.red('Remove noteID', id))
  await saveNotes(newNotes)
  return newNotes
}

module.exports ={
  addNote,
  getNote,
  printNotes,
  removeNotes
}

