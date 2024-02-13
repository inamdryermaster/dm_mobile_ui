import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies, setUserCookies, updateUserCookies } from './lib';
import { handleGlobalError } from '../../lib/handleGlobalError';
import { toast } from 'react-toastify';
import { userSubscriptionStatusThunk } from './userSlice';

const initialState = {
  firstName: '',
  paymentCards: [],
  showNewCard: false,
  isLoading: false,
  renewLoading: false,
  isUpdating: false,
};
export const userAccountThunk = createAsyncThunk(
  'userAccount/userAccountThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const userAccountPaymentCardsThunk = createAsyncThunk(
  'userAccount/userAccountPaymentCardsThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get('/dryermaster/account/stripe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const userAccountExistingPaymentThunk = createAsyncThunk(
  'userAccount/userAccountExistingPaymentThunk',
  async (id, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.post(
        '/dryermaster/account/stripe/charge',
        {
          paymentMethodId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(userSubscriptionStatusThunk());
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    getUserAccountStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userAccountThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(userAccountThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userAccountThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userAccountPaymentCardsThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userAccountPaymentCardsThunk.fulfilled, (state, { payload }) => {
        state.paymentCards = payload.data.data;
        state.isLoading = false;
      })
      .addCase(userAccountPaymentCardsThunk.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(
        userAccountExistingPaymentThunk.pending,
        (state, { payload }) => {
          state.renewLoading = true;
        }
      )
      .addCase(
        userAccountExistingPaymentThunk.fulfilled,
        (state, { payload }) => {
          toast.success(payload.message);
          state.renewLoading = false;
        }
      )
      .addCase(
        userAccountExistingPaymentThunk.rejected,
        (state, { payload }) => {
          console.log(payload);
          state.renewLoading = false;
        }
      );
  },
});
export const { getUserAccountStateValues } = userAccountSlice.actions;

export default userAccountSlice.reducer;
