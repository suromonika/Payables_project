import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  try {
    const response = await fetch('/api/invoices');
    const responseData = await response.json();
    console.log('Fetched data:', responseData);
    return responseData;
  } catch (error) {
    console.log('Error while fetching data:', error);
    throw error;
  }
});

export const fetchCurrencyData = createAsyncThunk(
  'currency/fetchData',
  async () => {
    try {
      const response = await fetch(
        'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json'
      );
      const currencyData = await response.json();
      console.log('Fetched currency data:', currencyData);
      return currencyData;
    } catch (error) {
      console.log('Error while catching currecy data', error);
      throw error;
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    updateData: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);

      // If the item exists in the state, update its properties
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    delete_invoice: (state, action) => {
      const newState = state.filter((item) => item._id !== action.payload);
      return newState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (_state, action) => {
      return action.payload;
    });
  },
});

const currencyDataSlice = createSlice({
  name: 'currencyData',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyData.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchCurrencyData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCurrencyData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

const toPaySlice = createSlice({
  name: 'to_pay',
  initialState: {},
  reducers: {
    toggle_to_pay: (state, action) => {
      const { itemId, toPay } = action.payload;
      return {
        ...state,
        [itemId]: toPay,
      };
    },
  },
  extraReducers: (builder) => {
    // Handle the initial data fetch
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const initialToPayState = {};
      action.payload.forEach((item) => {
        initialToPayState[item._id] = item.to_pay;
      });
      return initialToPayState;
    });
  },
});

const reminderSlice = createSlice({
  name: 'reminder',
  initialState: {},
  reducers: {
    toggle_reminder: (state, action) => {
      const { itemId, reminder } = action.payload;
      return {
        ...state,
        [itemId]: reminder,
      };
    },
  },
  extraReducers: (builder) => {
    // Handle the initial data fetch
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const initialReminderState = {};
      action.payload.forEach((item) => {
        initialReminderState[item._id] = item.reminder;
      });
      return initialReminderState;
    });
  },
});

const checkedSlice = createSlice({
  name: 'checked',
  initialState: {},
  reducers: {
    setChecked: (state, action) => {
      return action.payload;
    },
    toggleChecked: (state, action) => {
      const { id, checked } = action.payload;
      return state.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !checked };
        }
        return item;
      });
    },
  },
});

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    toPay: toPaySlice.reducer,
    reminder: reminderSlice.reducer,
    checked: checkedSlice.reducer,
    currencyData: currencyDataSlice.reducer,
  },
});

export const { setChecked, toggleChecked } = checkedSlice.actions;
export const { delete_invoice, updateData } = dataSlice.actions;
export const { toggle_to_pay } = toPaySlice.actions;
export const { toggle_reminder } = reminderSlice.actions;

export default store;
