const mongoose = require('mongoose');
// const User = mongoose.model('user'); // using pluralized version of 'user' - is this OK?
const User = require('../models/User');

module.exports = {
  async getUserExpenses(id) {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'Not found' });
    }
    const expenses = user.expenses;
    return expenses;
  }
};

// const getExpenses = async id => {
//   const user = await User.findById(id);
//   if (!user) {
//     return res.status(404).json({ msg: 'Not found' });
//   }
//   const expenses = user.expenses;
//   return expenses;
// };

// module.exports = getExpenses
