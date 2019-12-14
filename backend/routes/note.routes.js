const express = require('express');
const checkAuth = require('../middleware/authenticate');

const noteController = require('../controllers/note.controllers.js');

const router = express.Router();

router.post("",
    //checkAuth,
    noteController.post);

router.put("/:id",
    // checkAuth,
    noteController.put);

router.get("/:id", noteController.getById);

router.delete("/:id",
    // checkAuth,
    noteController.deleteById);

module.exports = router;