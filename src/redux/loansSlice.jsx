import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loansList: [],
  loanPerPage: { list: [], indexPage: 1, type: "", item: "" },
  loansFindLenght: { length: null, type: "", item: "" },
  booksFindList: [],
  usersFindList: [],
  inforBookLoan: {
    ISBN: null,
    amount: 1,
    title: null,
  },
  isLoading: false,
  error: null,
};
const LOANS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/borrowandreturn";
const BOOKS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/books";
const USERS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/users";
export const fetchLoans = createAsyncThunk("loans/fetchLoans", async () => {
  try {
    const res = await axios.get(LOANS_URL);

    const dateNow = new Date();
    const year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = dateNow.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }

    for await (const item of res.data) {
      if (
        Date.parse(item.dayReturn) <
          Date.parse(year + "-" + month + "-" + date) &&
        item.status === "unpaid"
      ) {
        item.status = "expired";
        await axios.put(`${LOANS_URL}/${item.id}`, {
          ...item,
        });
      }
    }

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

        return {
          list: [...res.data],
          indexPage: payload.indexPage,
          type: "",
          item: "",
        };
      } else {
        const res = await axios.get(
          `${LOANS_URL}?${payload.type}=${payload.value}&&limit=10&&page=${payload.indexPage}`
        );
        return {
          list: [...res.data],
          indexPage: payload.indexPage,
          type: payload.type,
          item: payload.value,
        };
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
      if (payload.value == "") {
        const res = await axios.get(
          `${LOANS_URL}?${payload.type}=${payload.value}`
        );
        return {
          length: res.data.length,
          type: payload.type,
          item: payload.value,
        };
      } else {
        const res = await axios.get(
          `${LOANS_URL}?${payload.type}=${payload.value}`
        );
        return {
          length: res.data.length,
          type: payload.type,
          item: payload.value,
        };
      }
    } catch (error) {
      return error.message;
    }
  }
);

export const usersFindList = createAsyncThunk(
  "loans/usersFindList",
  async (payload) => {
    try {
      const res = await axios.get(`${USERS_URL}?role=student`);

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
      const res = await axios.get(`${BOOKS_URL}`);

      return [...res.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const addLoan = createAsyncThunk("loans/addLoan", async (payload) => {
  try {
    await axios.post(`${LOANS_URL}`, { ...payload });
    const res = await axios.get(`${BOOKS_URL}?ISBN=${payload.ISBN}`);

    res.data[0].amount = res.data[0].amount - Number(payload.amount);
    await axios.put(`${BOOKS_URL}/${res.data[0].id}`, { ...res.data[0] });
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
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = dateNow.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }
    await axios.put(`${LOANS_URL}/${payload.id}`, {
      ...payload,
      status: "done",
      dayReturned: year + "-" + month + "-" + date,
    });
    const res = await axios.get(`${BOOKS_URL}?ISBN=${payload.ISBN}`);

    res.data[0].amount = res.data[0].amount + Number(payload.amount);
    await axios.put(`${BOOKS_URL}/${res.data[0].id}`, {
      ...res.data[0],
    });
  } catch (error) {
    return error.message;
  }
});

export const loansSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    inforBookLoan: (state, action) => {
      state.inforBookLoan = { ...action.payload };
    },
  },
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
      })
      .addCase(usersFindList.fulfilled, (state, action) => {
        state.usersFindList = action.payload;
      })
      .addCase(usersFindList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { inforBookLoan } = loansSlice.actions;
export default loansSlice.reducer;
