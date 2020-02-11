const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Set = require('../models/Set');

const router = express.Router();

// @route   POST api/sets
// @desc    Add set
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('questions.*.word', 'word is required for each question in set')
        .not()
        .isEmpty(),
      check(
        'questions.*.translation',
        'translation is required for each question in set'
      )
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, category, questions } = req.body;

    try {
      const newSet = new Set({
        name,
        category,
        questions,
        user: req.user.id
      });

      const set = await newSet.save();
      res.json(set);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/sets/
// @desc    Get all user sets name list
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const sets = await Set.find({ user: req.user.id })
      .sort({
        date: -1
      })
      .select('name');
    res.json(sets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sets/public
// @desc    Get all public set names
// @access  Public
router.get('/public/', async (req, res) => {
  try {
    const sets = await Set.find({ category: 'public' })
      .sort({
        date: -1
      })
      .select('name');
    res.json(sets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sets/{id}
// @desc    Get set
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const set = await Set.findById(req.params.id);
    if (!set) {
      return res.status(404).json({ msg: 'Set not found' });
    }
    if (set.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    res.json(set);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/sets/public/{id}
// @desc    Get set
// @access  Public
router.get('/public/:id', async (req, res) => {
  try {
    const set = await Set.findById(req.params.id);
    if (!set) {
      return res.status(404).json({ msg: 'Set not found' });
    }
    if (set.category !== 'public') {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    res.json(set);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/sets/
// @desc    delete set
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const set = await Set.findById(req.params.id);
    if (!set) {
      return res.status(404).json({ msg: 'Set not found' });
    }
    if (set.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Set.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Set removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
