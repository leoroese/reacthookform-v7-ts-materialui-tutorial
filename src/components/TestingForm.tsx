import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { TestService } from '@src/lib/services/TestService';

interface ITestingFormProps {
  name: string;
}

interface IFormInputs {
  email: string;
  password: string;
  name: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(4).max(20).required('Password is required'),
  name: yup.string().required('Name is required'),
});

const TestingForm: FC<ITestingFormProps> = ({ name }: ITestingFormProps) => {
  // i don't like passing submit function as props just for testing purposes
  // i rather test the outcome which in this case is just a simple console.log
  const submitForm: SubmitHandler<IFormInputs> = async (data) => {
    await TestService.testSubmit(data);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email ? errors.email?.message : ''}
              fullWidth
              margin="dense"
            />
          )}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message ?? ''}
          defaultValue=""
          fullWidth
          margin="dense"
          {...register('password')}
        />
        <Controller
          name="name"
          control={control}
          defaultValue={name}
          render={({ field }) => (
            <TextField
              {...field}
              id="name"
              label="Name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : ''}
              fullWidth
              margin="dense"
            />
          )}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default TestingForm;
