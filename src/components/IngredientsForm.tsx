import React, { FC } from 'react';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { IRecipe } from '@src/lib/interfaces/IRecipe';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const IngredientsForm: FC = () => {
  const classes = useStyles();

  const { control, register, watch } = useFormContext<IRecipe>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<IRecipe, 'ingredients', 'ingredientId'>(
    {
      control,
      name: 'ingredients',
      keyName: 'ingredientId',
    }
  );

  return (
    <>
      <Grid container direction="row">
        {fields.map((item, index) => (
          <Grid container item xs={12} key={item.ingredientId}>
            <Grid item>
              <Controller
                name={`ingredients.${index}.name`}
                control={control}
                defaultValue={item.name}
                render={({ field }) => <TextField {...field} data-testid={`ingredients.${index}.name`} />}
              />
            </Grid>
            <Grid item>
              <IconButton
                data-testid={`ingredients.${index}.removeButton`}
                onClick={() => {
                  remove(index);
                }}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            id="addButton"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => {
              append({ ingredientId: fields.length.toString(), name: '' });
            }}
          >
            Add Ingredient
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default IngredientsForm;
