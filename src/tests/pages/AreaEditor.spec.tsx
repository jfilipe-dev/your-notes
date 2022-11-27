import { render, screen, fireEvent, waitFor } from '@testing-library/react';

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

describe('Dashboard AreaEditor', () => {
  it('should render buttons and input', () => {
    render(<Dashboard />);

    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-test')).toBeInTheDocument();
  });

  it('should call update note', async () => {
    const areaEditorUpdateMocked = jest.fn();

    render(
      <Dashboard
        areaEditorUpdateMocked={areaEditorUpdateMocked}
        mockedNote={{
          id: '121323213',
          message: 'Message',
          title: 'Title',
        }}
      />,
    );

    const updateButton = screen.getByTestId('update-button');

    await waitFor(() => fireEvent.click(updateButton));

    expect(areaEditorUpdateMocked).not.toHaveBeenCalled();
  });

  it('should call delete note', async () => {
    const areaEditorDeleteMocked = jest.fn();

    render(
      <Dashboard
        areaEditorDeleteMocked={areaEditorDeleteMocked}
        mockedNote={{
          id: '121323213',
          message: 'Message',
          title: 'Title',
        }}
      />,
    );

    const updateButton = screen.getByTestId('delete-button');

    await waitFor(() => fireEvent.click(updateButton));

    expect(areaEditorDeleteMocked).not.toHaveBeenCalled();
  });
});
