import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseDashboardPage } from '../../components/ExpenseDashboardPage';

describe('Expense Dashboard test', () => {
  let fetchUser;

  beforeEach(() => {
    fetchUser = jest.fn();
  });

  it('should correctly render Expense dashboard when logged in', () => {
    const loading = false;
    const user = true;
    const wrapper = shallow(
      <ExpenseDashboardPage
        fetchUser={fetchUser}
        loading={loading}
        user={user}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect if no valid user found', () => {
    const loading = false;
    const user = false;
    const wrapper = shallow(
      <ExpenseDashboardPage
        fetchUser={fetchUser}
        loading={loading}
        user={user}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should show LoadingPage if Dashboard not yet loaded', () => {
    const loading = true;
    const wrapper = shallow(
      <ExpenseDashboardPage fetchUser={fetchUser} loading={loading} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
