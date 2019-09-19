import moment from 'moment';

// Get visible expenses based on filter selection
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);

      // If there is a start date filter -> is it <= expense createdAt date
      // if it is return true, if not return false
      // If there is no start date filter, return true
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;

      // If there is an end date filter -> is it >= expense createdAt date
      // if it is return true, if not return false
      // If there is no end date filter, return true
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      // Only include an expense in the filtered array when it matches the following:
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1; // Most recent first
      }

      if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1; // Most expensive first
      }
      return 0;
    });
};
