const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/authenticate');

const taskController = require('../controllers/task.controllers');

router.post('',
    // checkAuth,
    taskController.post
);
router.put('',
    // checkAuth,
    taskController.put
);
router.get('',
    taskController.get
);
router.get('/:date',
    taskController.getByDate
);
router.delete('/:id',
    // checkAuth,
    taskController.deleteById
);


module.exports = router;
