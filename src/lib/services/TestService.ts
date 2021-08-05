/* eslint-disable import/prefer-default-export */
const testSubmit = async (data: { email: string; password: string; name: string }): Promise<void> => {
  console.log('data', data);
};

export const TestService = {
  testSubmit,
};
