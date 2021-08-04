import React, { FC, useState } from 'react';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BillingForm from '@src/components/BillingForm';
import CompleteForm from '@src/components/CompleteForm';
import ShippingForm from '@src/components/ShippingForm';
import { CheckoutProvider } from '@src/lib/context/CheckoutContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: '100vh',
    },
  })
);
const CheckoutPage: FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  return (
    <CheckoutProvider>
      <div className={classes.root}>
        {activeStep === 0 && <ShippingForm setActiveStep={setActiveStep} />}
        {activeStep === 1 && (
          <BillingForm
            sameAsShipping={sameAsShipping}
            setSameAsShipping={setSameAsShipping}
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 2 && <CompleteForm setActiveStep={setActiveStep} />}
      </div>
    </CheckoutProvider>
  );
};

export default CheckoutPage;
