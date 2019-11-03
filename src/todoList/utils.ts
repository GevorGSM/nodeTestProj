import * as fs from 'fs';

const fetchNotes = () => {
  try {
    const notesString: any = fs.readFileSync('src/todoList/notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('src/todoList/notes-data.json', JSON.stringify(notes, undefined, 2));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    const note = {
      title,
      body
    };
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const getNote = (title) => {
  const notes = fetchNotes();
  const filteredNote = notes.find((note) => note.title === title);
  return filteredNote;
};

const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

export {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
