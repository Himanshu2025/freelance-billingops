import { describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders children and handles click', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    const { getByRole } = render(<Button onClick={onClick}>Create Invoice</Button>);

    await user.click(getByRole('button', { name: /create invoice/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
