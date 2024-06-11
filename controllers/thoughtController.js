const Thought = require('../models/Thought');
const User = require('../models/User');

// Controller functions

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a thought by ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    // Add the new thought to the user's thought list
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    // Remove the thought from the user's thought list
    await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.id } });
    res.json(deletedThought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought
};
