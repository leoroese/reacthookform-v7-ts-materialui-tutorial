import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useCheckout } from '@src/lib/context/CheckoutContext';

interface ICompleteFormProps {
  setActiveStep: (activeStep: number) => void;
}
const CompleteForm: FC<ICompleteFormProps> = ({ setActiveStep }: ICompleteFormProps) => {
  const checkoutContext = useCheckout();

  return (
    <>
      <p>{JSON.stringify(checkoutContext.state.shippingInfo)}</p>
      <p>{JSON.stringify(checkoutContext.state.billingInfo)}</p>
      <Button onClick={() => setActiveStep(1)}>Back</Button>
    </>
  );
};

export default CompleteForm;
