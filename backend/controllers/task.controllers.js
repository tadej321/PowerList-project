const Task = require('../db/models/task.model');

// Post a new task.
exports.post = (req, res, next) => {
    const task = new Task({
        description: req.body.description,
        completion: req.body.completion,
        // creator: req.userData.userId
    });
    task.save()
    .then(createdTask => {
        res.status(201).json({
            message: "Task created successfully",
            task: {
                ...createdTask,
                id: createdTask._id
            }
        });
    })
    .catch(error => {
       res.status(500).json({
          message: "Creating task failed"
       });
    });
};

// Update an existing task with new data.
exports.put = (req, res, next) => {
    const task = new Task({
        _id: req.params.id,
        description: req.body.description,
        completion: req.body.completion,
        // creator: req.userData.userId
    });
    Task.updateOne(
        {
            _id: req.params.id,
            // creator: req.userData.userId
        },
        task
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

// Get all tasks.
exports.get = (req, res, next) => {
    const taskQuery = Task.find();
    taskQuery
        .then(documents => {
            res.status(200).json({
                message: "Tasks fetched successfully",
                documents
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching tasks failed"
            });
        });
};

// Get one task by its id.
exports.getById = (req, res, next) => {
    Task.findById(req.params.id)
    .then(task => {
        if (task) {
            res.status(200).json({
                message: "Task fetched successfully",
                task
            });
        } else {
            res.status(404).json({ message: "Task not found"})
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching task failed"
        });
    });
};

// Delete one task by its id.
exports.deleteById = (req, res, next) => {
    Task.deleteOne(
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
            message: "Deleting task failed"
        });
    });
};