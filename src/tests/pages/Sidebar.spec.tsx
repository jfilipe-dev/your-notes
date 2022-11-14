import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from '../../components/Sidebar';

import Dashboard from '../../pages/dashboard';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push() {
        return null;
      },
    };
  },
}));

describe('Dashboard Sidebar', () => {
  it('should render  buttons', () => {
    render(<Dashboard />);
    expect(screen.getByText('Nova nota')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should call create note', async () => {
    const sidebarCreateMocked = jest.fn();

    render(<Sidebar createNote={sidebarCreateMocked} notes={[]} />);

    const newnoteButton = screen.getByTestId('mewnote-button');

    await waitFor(() => fireEvent.click(newnoteButton));

    expect(sidebarCreateMocked).toHaveBeenCalled();
  });
});
