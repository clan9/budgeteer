import expensesTotal from '../../selectors/selectedExpensesTotal';
import expenses from '../fixtures/expenses';

describe('Selected expenses total tests', () => {
  it('should return 0 if no expenses', () => {
    const total = expensesTotal([]);
    expect(total).toBe(0);
  });

  it('should return correct total for one expense', () => {
    const total = expensesTotal([expenses[1]]);
    expect(total).toBe(expenses[1].amount);
  });

  it('should return correct total for multiple expenses', () => {
    const total = expensesTotal([expenses[1], expenses[2]]);
    expect(total).toBe(expenses[1].amount + expenses[2].amount);
  });
});
