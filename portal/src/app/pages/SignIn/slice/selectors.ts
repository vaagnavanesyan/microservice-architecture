import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.signin || initialState;

export const selectSignin = createSelector([selectSlice], state => state);
