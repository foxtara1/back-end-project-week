const express = require('express');
const server = express();

const Note = require('../models/notes-model');

server.use(express.json());

server.post('/note/create', (req, res) => {
  const { userid } = req.headers;
  console.log(userid)
  const { noteTitle, noteBody } = req.body;
  const newNote = {
    noteTitle,
    noteBody,
    userId: userid,
  };
  if (noteTitle && noteBody) {
    const note = new Note(newNote);
    note
      .save()
      .then((note) => {
        if (note) {
          Note.find({ userId: userid })
            .then((notes) => {
              if (notes) {
                res.status(200).json(notes);
              } else res.status(404).json({ message: 'No notes found.' });
            })
            .catch((err) => res.status(400).json(err));
        } else res.status(500).json({ error: 'Unable to Save Note' });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res
      .status(400)
      .json({ error: 'Please provide both a title and note body.' });
  }
});

server.get('/notes', (req, res) => {
  const { userid } = req.headers;
  Note.find({ userId: userid })
    .then((notes) => {
      if (notes) {
        res.status(200).json(notes);
      } else res.status(404).json({ message: 'No notes found.' });
    })
    .catch((err) => res.status(400).json(err));
});


server.put('/note', (req, res) => {
  const { userid } = req.headers;
  console.log(req.body);
  const { noteTitle, noteBody, id } = req.body;
  if (id && (noteTitle || noteBody)) {
    const updatedNote = {
      noteTitle,
      noteBody,
    };
    Note.findByIdAndUpdate(id, updatedNote)
      .then((note) => {
        if (note) {
          Note.findById(note.id)
            .then((note) => {
              if (note) {
                Note.find({ userId: userid })
                  .then((notes) => {
                    if (notes) {
                      res.status(200).json(notes);
                    } else res.status(404).json({ message: 'No notes found.' });
                  })
                  .catch((err) => res.status(400).json(err));
              } else res.status(500).json({ error: 'Unable to Save Note' });
            })
            .catch((err) => res.status(500).json(err));
        } else res.status(404).json({ message: 'No note with that id.' });
      })
      .catch((err) => res.status(500).json(err));
  } else
    res.status(400).json({ error: 'Please provide an ID and Title or Body.' });
});

server.delete('/note/:id', (req, res) => {
  const { userid } = req.headers;
  Note.findByIdAndRemove(req.params.id)
    .then((note) => {
      Note.find({ userId: userid })
        .then((notes) => {
          if (notes) {
            res.status(200).json(notes);
          } else res.status(404).json({ message: 'No notes found.' });
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = server;