import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Login from '../../pages/index';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push() {
        return null;
      },
    };
  },
}));

describe('Login button', () => {
  it('should render login button', () => {
    render(<Login />);
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('should call login', async () => {
    const loginMocked = jest.fn();

    render(<Login loginMocked={loginMocked} />);

    const loginButton = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await waitFor(() =>
      fireEvent.change(emailInput, { target: { value: 'teste@email.com' } }),
    );
    await waitFor(() =>
      fireEvent.change(passwordInput, { target: { value: '123456' } }),
    );
    await waitFor(() => fireEvent.click(loginButton));

    expect(loginMocked).toHaveBeenCalled();
  });

  it('should not call login', async () => {
    const loginMocked = jest.fn();

    render(<Login loginMocked={loginMocked} />);

    const loginButton = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('email-input');

    await waitFor(() =>
      fireEvent.change(emailInput, { target: { value: 'teste@email.com' } }),
    );

    await waitFor(() => fireEvent.click(loginButton));

    expect(loginMocked).not.toHaveBeenCalled();
  });
});
