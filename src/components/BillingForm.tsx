import React, { FC, useState, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, Grid, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, Controller, FormProvider, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useCheckout } from '@src/lib/context/CheckoutContext';
import { IShippingBillingInfo } from '@src/lib/interfaces/IShippingBillingInfo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
      width: '100%',
      backgroundColor: 'white',
    },
    form: {
      margin: theme.spacing(2),
      width: '90%',
    },
    leftField: {
      [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(1),
      },
      marginRight: theme.spacing(0),
    },
  })
);

const schema = yup.object().shape({
  name: yup.string().max(300).required(),
  email: yup.string().email().max(256).required(),
  address: yup.string().max(400).required(),
  address2: yup.string().max(100).optional(),
  phone: yup.string().length(10).required(),
  city: yup.string().max(100).required(),
  state: yup.string().length(2).required(),
  zip: yup.string().length(5).required(),
});

interface IBillingFormProps {
  setActiveStep: (page: number) => void;
  sameAsShipping: boolean;
  setSameAsShipping: (same: boolean) => void;
}

const BillingForm: FC<IBillingFormProps> = ({
  setActiveStep,
  sameAsShipping,
  setSameAsShipping,
}: IBillingFormProps) => {
  const classes = useStyles();
  const checkoutContext = useCheckout();

  const onSubmit: SubmitHandler<IShippingBillingInfo> = (data: IShippingBillingInfo) => {
    console.log('data', data);
    checkoutContext.dispatch({ type: 'updateBillingInfo', payload: data });
    setActiveStep(2);
  };

  const methods = useForm<IShippingBillingInfo>({
    resolver: yupResolver(schema),
    defaultValues: checkoutContext.state.billingInfo,
  });

  useEffect(() => {
    if (sameAsShipping) {
      methods.reset(checkoutContext.state.shippingInfo);
    } else if (!sameAsShipping) {
      if (checkoutContext.state.billingInfo.name) {
        methods.reset(checkoutContext.state.billingInfo);
      } else {
        methods.reset({ name: '', email: '', phone: '', address: '', address2: '', city: '', state: '', zip: '' });
      }
    }
  }, [sameAsShipping, checkoutContext.state]);

  return (
    <Grid container item direction="column" justifyContent="center" className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h2">Billing</Typography>
      </Grid>
      <Grid item xs={12}>
        <Checkbox
          checked={sameAsShipping}
          onChange={() => {
            setSameAsShipping(!sameAsShipping);
          }}
        />
      </Grid>
      <FormProvider {...methods}>
        <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid item xs={12} sm>
            <Controller
              name="name"
              control={methods.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: sameAsShipping }}
                />
              )}
            />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={7} className={classes.leftField}>
              <Controller
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    InputProps={{ readOnly: sameAsShipping }}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="phone"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    InputProps={{ readOnly: sameAsShipping }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2">Address Info</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={methods.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street address or P.O. Box"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: sameAsShipping }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address2"
              control={methods.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apt, suite, unit, building, floor, etc."
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: sameAsShipping }}
                />
              )}
            />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={6} className={classes.leftField}>
              <Controller
                name="city"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    InputProps={{ readOnly: sameAsShipping }}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm className={classes.leftField}>
              <Controller
                name="state"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    InputProps={{ readOnly: sameAsShipping }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm>
              <Controller
                name="zip"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Zip"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    InputProps={{ readOnly: sameAsShipping }}
                  />
                )}
              />{' '}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="button" onClick={() => setActiveStep(0)}>
              Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Next</Button>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};

export default BillingForm;
