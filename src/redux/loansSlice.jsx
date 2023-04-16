import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loansList: [],
  loanPerPage: [],
  loansFindLenght: [],
  booksFindList: [],
  isLoading: false,
  error: null,
};
const LOANS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn";
const BOOKS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/books";
const USERS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/users";

export const fetchLoans = createAsyncThunk("loans/fetchLoans", async () => {
  try {
    const res = await axios.get(LOANS_URL);

    return [...res.data];
  } catch (error) {
    return error.message;
  }
});
export const fetchLoanPerPage = createAsyncThunk(
  "loans/fetchLoanPerPage",
  async (payload) => {
    try {
      if (!payload.value) {
        const res = await axios.get(
          `${LOANS_URL}?limit=10&&page=${payload.indexPage}`
        );
        return [...res.data];
      } else {
        const res = await axios.get(
          `${LOANS_URL}?${payload.type}=${payload.value}&&limit=10&&page=${payload.indexPage}`
        );
        return [...res.data];
      }
    } catch (error) {
      return error.message;
    }
  }
);

export const loansFindLenght = createAsyncThunk(
  "loans/loansFindLenght",
  async (payload) => {
    try {
      const res = await axios.get(
        `${LOANS_URL}?${payload.type}=${payload.value}`
      );
      return [...res.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const booksFindList = createAsyncThunk(
  "loans/booksFindList",
  async (payload) => {
    try {
      const res = await axios.get(
        `${BOOKS_URL}?${payload.type}=${payload.value}`
      );
      console.log("booksFindList: ", res.data);

      return [...res.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const addLoan = createAsyncThunk("loans/addLoan", async (payload) => {
  try {
    await axios.post(`${LOANS_URL}`, { ...payload });
  } catch (error) {
    return error.message;
  }
});

export const editLoan = createAsyncThunk("loans/editLoan", async (payload) => {
  try {
    await axios.put(`${LOANS_URL}/${payload.id}`, { ...payload });
  } catch (error) {
    return error.message;
  }
});

export const paidBook = createAsyncThunk("loans/paidBook", async (payload) => {
  try {
    await axios.delete(`${LOANS_URL}/${payload}`);
  } catch (error) {
    return error.message;
  }
});

export const loansSlice = createSlice({
  name: "loans",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loansList = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLoanPerPage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLoanPerPage.fulfilled, (state, action) => {
        state.isLoading = false;

        state.loanPerPage = action.payload;
      })
      .addCase(fetchLoanPerPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(loansFindLenght.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loansFindLenght.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loansFindLenght = action.payload;
      })
      .addCase(loansFindLenght.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(booksFindList.fulfilled, (state, action) => {
        state.booksFindList = action.payload;
      })
      .addCase(booksFindList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default loansSlice.reducer;
