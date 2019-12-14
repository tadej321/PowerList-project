const Note = require('../db/models/note.model');

// Post a new note.
exports.post = (req, res, next) => {
    const note = new Note({
        date: new Date().toString(),
        note: req.body.note,
        //creator: req.userData.userId
    });
    note.save()
        .then(createdNote => {
            res.status(201).json({
                message: "Note created successfully",
                note: {
                    ...createdNote,
                    id: createdNote._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating note failed"
            });
        });
};

// Update an existing note with new data.
exports.put = (req, res, next) => {
    const note = new Note({
        _id: req.params.id,
        note: req.body.note,
        //creator: req.userData.creator
    });
    Note.updateOne(
        {
            _id: req.params.id,
            //creator: req.userData.userId
        },
        note
    ).then(result => {
        res.status(200).json({
            message: "Update successful"
        });
    })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Couldn't update task"
            });
        });
};

// Get one note by its id.
exports.getById = (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.status(200).json({
                    message: "Note fetched successfully",
                    note
                });
            } else {
                res.status(404).json({ message: "Note not found"})
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching note failed"
            });
        });
};

// Delete one note by its id.
exports.deleteById = (req, res, next) => {
    Note.deleteOne(
        {
            _id: req.params.id,
            // creator: req.userData.userId
        }
    )
        .then(() => {
            res.status(200).json({ message: "Deletion successful"});
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting note failed"
            });
        });
};