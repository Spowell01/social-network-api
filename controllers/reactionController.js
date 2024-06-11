const Thought = require('../models/Thought');

// Controller functions

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Add the reaction to the thought's reactions array
    thought.reactions.push(req.body);
    await thought.save();

    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Find the index of the reaction to remove
    const reactionIndex = thought.reactions.findIndex(reaction => reaction._id == req.params.reactionId);
    if (reactionIndex === -1) {
      return res.status(404).json({ message: 'Reaction not found' });
    }

    // Remove the reaction from the reactions array
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();

    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addReaction,
  removeReaction
};
