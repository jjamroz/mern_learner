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

module.exports = router;
