const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/authenticate');

const taskController = require('../controllers/task.controllers');

router.post("",
    // checkAuth,
    taskController.post
);
router.put("/:id",
    // checkAuth,
    taskController.put
);
router.get("",
    taskController.get
);
router.get("/:id",
    taskController.getById
);
router.delete("/:id",
    // checkAuth,
    taskController.deleteById
);


module.exports = router;