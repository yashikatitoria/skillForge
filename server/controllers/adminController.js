const User = require('../models/User');
const Project = require('../models/Project');

// list all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// delete a user by id
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // also cascade projects if business?
    await Project.deleteMany({ $or: [{ businessId: id }, { assignedStudentId: id }] });
    res.json({ message: 'User removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// list all projects (optionally filter by status or user)
exports.listProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// update any project (already covered in projectController) but admin
// could also have a dedicated route here if desired
