'use client'; // This file is explicitly a Client Component

import { Provider } from 'react-redux';
import { store } from './../store/store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}