const Task = require('../db/models/task.model');

// Post a new task.
exports.post = (req, res, next) => {
    const task = new Task({
        description: req.body.description,
        completion: req.body.completion,
        date: req.body.date,
        index: req.body.index,
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
        _id: req.body.id,
        description: req.body.description,
        completion: req.body.completion,
        index: req.body.index,
        // creator: req.userData.userId
    });
    Task.updateOne(
        {
            _id: req.body.id,
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
        .then(tasks => {
            res.status(200).json({
                message: "Tasks fetched successfully",
                tasks
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

// Get tasks by date
exports.getByDate = (req, res, next) => {
    Task.find({date: req.params.date})
        .then(tasks => {
            if (tasks) {
                res.status(200).json({
                    message: "Tasks fetched successfully",
                    tasks
                });
            } else {
                res.status(404).json({ message: "Tasks not found"})
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching tasks failed"
            });
        });
};

// Delete one task by its id.
exports.deleteById = (req, res, next) => {
    Task.deleteOne({_id: req.params.id}
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
