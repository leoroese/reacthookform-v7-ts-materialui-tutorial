import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IngredientsForm from '@src/components/IngredientsForm';
import renderWithRHFormProvider from '../lib/tests/utils/renderWithRHFormProvider';

describe('ingredients form', () => {
  beforeEach(() => {
    renderWithRHFormProvider(<IngredientsForm />);
  });

  it('initial render', () => {
    expect(screen.getByRole('button', { name: /Add Ingredient/i })).toBeInTheDocument();
  });

  it('render empty value on addButton click', async () => {
    const addButton = screen.getByRole('button', { name: /Add Ingredient/i });
    // test outcome not so much the function
    userEvent.click(addButton);
    const ingredientsTextBox = await screen.findByTestId('ingredients.0.name');
    expect(ingredientsTextBox).toBeInTheDocument();
  });

  it('render 2 empty value ingredients on clicking addButton twice', async () => {
    const addButton = screen.getByRole('button', { name: /Add Ingredient/i });
    // test outcome not so much the function
    userEvent.click(addButton);
    userEvent.click(addButton);
    const ingredientsTextBox0 = await screen.findByTestId('ingredients.0.name');
    const ingredientsTextBox1 = await screen.findByTestId('ingredients.1.name');

    expect(ingredientsTextBox0).toBeInTheDocument();
    expect(ingredientsTextBox1).toBeInTheDocument();
  });

  it('test remove added ingredient', async () => {
    const addButton = screen.getByRole('button', { name: /Add Ingredient/i });
    userEvent.click(addButton);
    const ingredientsTextBox = await screen.findByTestId('ingredients.0.name');
    expect(ingredientsTextBox).toBeInTheDocument();
    const removeIngredientIconButton = await screen.findByTestId('ingredients.0.removeButton');
    expect(removeIngredientIconButton).toBeInTheDocument();
    userEvent.click(removeIngredientIconButton);
    expect(ingredientsTextBox).not.toBeInTheDocument();
    expect(removeIngredientIconButton).not.toBeInTheDocument();
  });
});
