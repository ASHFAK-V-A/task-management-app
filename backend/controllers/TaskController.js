import moment from "moment";
import Task from "../models/Task.js"; // make sure your model is renamed Task.js


// Get all tasks for the logged-in user with optional status & priority filters
export const getTasks = async (req, res) => {

  const { status, priority, due_date } = req.query; // frontend should send due_date as YYYY-MM-DD

  try {
    const filter = { owner: req.user.id };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (due_date) {
      const start = moment(due_date).startOf("day").toDate();
      const end = moment(due_date).endOf("day").toDate();
      filter.due_date = { $gte: start, $lte: end };
    }

    const tasks = await Task.find(filter)
      .populate("owner", "username email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};
// Get single task by id (for view page)
export const ViewTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, owner: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      due_date,
      owner: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update a task by id
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, owner: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete a task by id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, owner: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

export const getTaskStats = async (req, res) => {

  try {
    const ownerId = req.user.id;

    // Fetch all tasks for the logged-in user
    const tasks = await Task.find({ owner: ownerId });

    // Count tasks by status
    const statusCounts = tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { pending: 0, "in-progress": 0, completed: 0 }
    );

    // Calculate tasks due today and this week
    const today = moment().startOf("day");
    const weekEnd = moment().endOf("week");

    const dueToday = tasks.filter((task) =>
      moment(task.due_date).isSame(today, "day")
    ).length;

    const dueThisWeek = tasks.filter((task) =>
      moment(task.due_date).isBetween(today, weekEnd, "day", "[]")
    ).length;

    // Return statistics
    res.json({
      statusCounts,
      dueToday,
      dueThisWeek,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Error fetching stats" });
  }
};