const router = require('express').Router();
const Task = require('../models/Task');
const requireAuth = require('../middleware/auth');

// List tasks
// router.get('/', requireAuth, async (req, res) => {
//   const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
//   return res.json({ tasks });
// });

// List tasks new
router.get('/', requireAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }) // ✅ updated
      .sort({ createdAt: -1 });

    return res.json({ tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});


// .......................
// Create Task
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description = '', status = 'Pending' } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      user: req.user.id,   // ✅ Corrected here
      title,
      description,
      status
    });

    return res.status(201).json({ task });
  } catch (err) {
    console.error("Error creating task:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});


// // Get one
// router.get('/:id', requireAuth, async (req, res) => {
//   const task = await Task.findOne({ _id: req.params.id, user: req.userId });
//   if (!task) return res.status(404).json({ message: 'Task not found' });
//   return res.json({ task });
// });

// .......................
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ task });   // ✅ Wrap in object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Delete
// router.delete('/:id', requireAuth, async (req, res) => {
//   const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
//   if (!task) return res.status(404).json({ message: 'Task not found' });
//   return res.json({ message: 'Deleted' });
// });

// Delete task
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ use req.user.id from JWT
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error("Delete task error:", err);
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
