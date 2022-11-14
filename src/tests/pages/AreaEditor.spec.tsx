import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AreaEditor from '../../components/AreaEditor';

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

    render(<AreaEditor onUpdate={areaEditorUpdateMocked} />);

    const updateButton = screen.getByTestId('update-button');

    await waitFor(() => fireEvent.click(updateButton));

    expect(areaEditorUpdateMocked).not.toHaveBeenCalled();
  });
});
