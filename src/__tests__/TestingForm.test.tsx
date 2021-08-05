import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import TestingForm from '@src/components/TestingForm';
import { TestService } from '@src/lib/services/TestService';

jest.mock('@src/lib/services/TestService');
const mockTestService = mocked(TestService, true);

describe('TestingForm', () => {
  const name = 'lebron curry';
  const email = 'lebronCurry@kings.com';
  const password = 'imsecret';

  beforeEach(() => {
    render(<TestingForm name={name} />);
  });

  it('initial render', () => {
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });

    const passwordTextField = screen.getByRole('textbox', {
      name: /password/i,
    });
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(emailTextField).toBeInTheDocument();
    expect(passwordTextField).toBeInTheDocument();
    expect(nameTextField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(nameTextField).toHaveValue(name);
  });

  it('successful submit', async () => {
    const emailTextField = screen.getByRole('textbox', {
      name: /email/i,
    });

    const passwordTextField = screen.getByRole('textbox', {
      name: /password/i,
    });
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(emailTextField, email);
    userEvent.type(passwordTextField, password);
    expect(emailTextField).toBeInTheDocument();
    expect(passwordTextField).toBeInTheDocument();
    expect(nameTextField).toBeInTheDocument();
    expect(emailTextField).toHaveValue(email);
    expect(passwordTextField).toHaveValue(password);
    expect(nameTextField).toHaveValue(name);
    userEvent.click(submitButton);

    await waitFor(async () => {
      expect(mockTestService.testSubmit).toHaveBeenCalledTimes(1);
      expect(mockTestService.testSubmit).toHaveBeenCalledWith({ email, password, name });
    });
  });

  it('required validation failures', async () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    const nameTextField = screen.getByRole('textbox', {
      name: /name/i,
    });
    userEvent.clear(nameTextField);
    userEvent.click(submitButton);

    // https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
    // side-effects outside of waitFor and leave waitFor for assertions only
    await waitFor(async () => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });
});
