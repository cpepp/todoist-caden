const Task = require("../schema/taskschema");

exports.addTask = async (req, res, next) => {
  console.log("Request to make new task");
  var schema = new Task({
    name: req.body.taskName
  });

  await Task.create(schema)
    .then((task) => {
      console.log("Task made with id " + task._id);
      res.status(201).json(task);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.getTasks = async (req, res, next) => {
  console.log("Request for all tasks");
  await Task.find({})
    .then((task) => {
      res.json(task);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.deleteTask = async (req, res, next) => {
  await Task.deleteOne({ _id: req.params._id })
    .then(() => {
      console.log("Deleted task with id " + req.params._id);
      res.status(200);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

exports.updateTask = async (req, res, next) => {
  await Task.updateOne({ _id: req.params._id }, { completed: true })
    .then(() => {
      console.log("Updated task with id " + req.params._id);
      res.status(200);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
