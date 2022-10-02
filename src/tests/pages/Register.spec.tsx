import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Register from '../../pages/register';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push() {
        return null;
      },
    };
  },
}));

describe('Register button', () => {
  it('should render register button', () => {
    render(<Register />);
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  it('should call register', async () => {
    const registerMocked = jest.fn();

    render(<Register registerMocked={registerMocked} />);

    const registerButton = screen.getByTestId('register-button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const passwordConfirmInput = screen.getByTestId('password-confirm-input');
    const nameInput = screen.getByTestId('name-input');

    await waitFor(() =>
      fireEvent.change(emailInput, { target: { value: 'teste@email.com' } }),
    );
    await waitFor(() =>
      fireEvent.change(passwordInput, { target: { value: '123456' } }),
    );
    await waitFor(() =>
      fireEvent.change(passwordConfirmInput, { target: { value: '123456' } }),
    );
    await waitFor(() =>
      fireEvent.change(nameInput, { target: { value: 'User name' } }),
    );
    await waitFor(() => fireEvent.click(registerButton));

    expect(registerMocked).toHaveBeenCalled();
  });

  it('should not call register', async () => {
    const registerMocked = jest.fn();

    render(<Register registerMocked={registerMocked} />);

    const registerButton = screen.getByTestId('register-button');
    const emailInput = screen.getByTestId('email-input');

    await waitFor(() =>
      fireEvent.change(emailInput, { target: { value: 'teste@email.com' } }),
    );
    await waitFor(() => fireEvent.click(registerButton));

    expect(registerMocked).not.toHaveBeenCalled();
  });
});
