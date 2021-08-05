import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithRHFormProvider = (ui: any) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper: React.FC = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return render(<Wrapper>{ui}</Wrapper>);
};

export default renderWithRHFormProvider;
