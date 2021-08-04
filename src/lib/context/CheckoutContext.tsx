import React from 'react';
import { IShippingBillingInfo } from '../interfaces/IShippingBillingInfo';

type State = {
  shippingInfo: IShippingBillingInfo;
  billingInfo: IShippingBillingInfo;
};
type Action =
  | { type: 'updateShippingInfo'; payload: IShippingBillingInfo }
  | { type: 'updateBillingInfo'; payload: IShippingBillingInfo };
type Dispatch = (action: Action) => void;
type CheckoutProviderProps = { children: React.ReactNode };

const initialState: State = {
  shippingInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
  billingInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
};

const CheckoutContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const checkoutReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'updateShippingInfo': {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    }
    case 'updateBillingInfo': {
      return {
        ...state,
        billingInfo: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [state, dispatch] = React.useReducer(checkoutReducer, initialState);
  const value = { state, dispatch };
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCheckout = () => {
  const context = React.useContext(CheckoutContext);
  if (context) {
    return context;
  }
  throw new Error('useCheckout must be used within a CheckoutProvider');
};

export { CheckoutProvider, useCheckout };
