const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { dirname } = require('path');

function createNewNote(newNote){
    const {title, text} = newNote;
    const newNote1 = {title, text, id: Math.random().toString()};
    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    console.log(notes);
    
    notes = [...notes, newNote1];
    return fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    // return note;
}

router.get('/notes', (req, res) => {

    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    //console.log(notes);

    const results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    const note = createNewNote(req.body);
    res.json(note)
});

module.exports = router;