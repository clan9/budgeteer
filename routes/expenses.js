const express = require('express');
const User = require('../models/User');
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();

// All routes here are pre-pended with '/api/expenses'

// @route   POST /api/expenses
// @desc    add a new expense
// @access  Private
router.post('/', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'Not found' });
    }

    const expenses = user.expenses;
    const { description, note, amount, createdAt } = req.body;
    const newExpense = { description, note, amount, createdAt };
    expenses.push(newExpense);

    await user.save();
    const addedExpense = user.expenses[user.expenses.length - 1];
    // console.log('Saved Expense IS -> ', addedExpense);

    res.json(addedExpense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/expenses
// @desc    list all expenses for a user
// @access  Private
router.get('/', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'Not found' });
    }

    const expenses = user.expenses;
    res.json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PATCH /api/expenses/:id
// @desc    edit an expense
// @access  Private
// *** Change this once auth set up so we can find user by req.user.id
// *** and then create updates array using Object.keys ??? (seems to be working ok just now)
router.patch('/:id', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'Not found' });
    }

    const expenses = user.expenses;
    const expense = expenses.find(expense => expense.id === req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    const { description, amount, createdAt, note } = req.body;

    description && (expense.description = description);
    amount && (expense.amount = amount);
    note && (expense.note = note);
    createdAt && (expense.createdAt = createdAt);

    await user.save();

    res.json(expense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/expenses/:id
// @desc    delete an expense
// @access  Private
router.delete('/:id', requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'Not found' });
    }

    const expenses = user.expenses;
    const deletedExpense = expenses.find(
      expense => expense.id === req.params.id
    );

    if (!deletedExpense) {
      return res.status(404).json({ msg: 'Not found' });
    }

    await deletedExpense.remove();
    await user.save();

    // console.log('Deleted expense: ', deletedExpense);
    // console.log('Updated expenses: ', expenses);

    res.json(deletedExpense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

// *****************************

// INITIAL CODE FOR POSTMAN:

// // Create expense
// router.post('/', async (req, res) => {
//   try {
//     const user = await User.findById(req.body.id);

//     if (!user) {
//       return res.status(404).json({ msg: 'Not found' });
//     }

//     const expenses = user.expenses;
//     const { description, note, amount, createdAt } = req.body;
//     const newExpense = { description, note, amount, createdAt };
//     expenses.push(newExpense);

//     await user.save();
//     const addedExpense = user.expenses[user.expenses.length - 1];
//     // console.log('SAved Expense IS -> ', addedExpense);

//     res.json(addedExpense);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Read (fetch) all expenses
// router.get('/', async (req, res) => {
//   try {
//     const user = await User.findById(req.body.id);

//     if (!user) {
//       return res.status(404).json({ msg: 'Not found' });
//     }

//     const expenses = user.expenses;
//     // expenses.forEach(expense => console.log(expense._id.toString()));
//     res.json(expenses);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Update an expense (by the expense id)
// // *** Change this once auth set up so we can find user by req.user.id
// // *** and then create updates array using Object.keys ??? (seems to be working ok just now)
// router.patch('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.body.id);

//     if (!user) {
//       return res.status(404).json({ msg: 'Not found' });
//     }

//     const expenses = user.expenses;
//     const expense = expenses.find(expense => expense.id === req.params.id);

//     if (!expense) {
//       return res.status(404).json({ msg: 'Expense not found' });
//     }

//     const { description, amount, createdAt, note } = req.body;

//     description && (expense.description = description);
//     amount && (expense.amount = amount);
//     note && (expense.note = note);
//     createdAt && (expense.createdAt = createdAt);

//     await user.save();

//     res.json(expense);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// // Delete an expense (by the expense id)
// router.delete('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.body.id);

//     if (!user) {
//       return res.status(404).json({ msg: 'Not found' });
//     }

//     const expenses = user.expenses;
//     const deletedExpense = expenses.find(
//       expense => expense.id === req.params.id
//     );

//     if (!deletedExpense) {
//       return res.status(404).json({ msg: 'Not found' });
//     }

//     await deletedExpense.remove();
//     await user.save();

//     // console.log('Deleted expense: ', deletedExpense);
//     // console.log('Updated expenses: ', expenses);

//     res.json(deletedExpense);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });
