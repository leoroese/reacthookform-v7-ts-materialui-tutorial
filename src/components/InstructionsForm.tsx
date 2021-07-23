import React, { FC } from 'react';
import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { IRecipe } from '@src/lib/interfaces/IRecipe';

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const InstructionsForm: FC = () => {
  const classes = useStyles();

  const { control, register, watch, getValues } = useFormContext<IRecipe>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<
    IRecipe,
    'instructions',
    'instructionId'
  >({
    control,
    name: 'instructions',
    keyName: 'instructionId',
  });

  console.log('instructions are', watch('instructions'));
  console.log(getValues(`instructions.${0}.message`));

  return (
    <>
      <Grid container direction="row">
        {fields.map((item, index) => (
          <Grid container item xs={12} key={item.instructionId}>
            <Grid item>
              <Controller
                name={`instructions.${index}.message`}
                control={control}
                defaultValue={item.message}
                render={({ field }) => <TextField {...field} />}
              />
            </Grid>
            <Grid item>
              <IconButton
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
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => {
              append({ instructionId: fields.length.toString(), message: '' });
            }}
          >
            Add Instruction
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default InstructionsForm;
