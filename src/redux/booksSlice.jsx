import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  booksList: [],
  bookPerPage: [],
  booksFindLenght: [],
  isLoading: false,
  error: null,
};
const BOOKS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/books";
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const res = await axios.get(BOOKS_URL);

    return [...res.data];
  } catch (error) {
    return error.message;
  }
});
export const fetchBookPerPage = createAsyncThunk(
  "books/fetchBookPerPage",
  async (payload) => {
    try {
      if (!payload.value) {
        const res = await axios.get(
          `${BOOKS_URL}?limit=10&&page=${payload.indexPage}`
        );
        return [...res.data];
      } else {
        const res = await axios.get(
          `${BOOKS_URL}?${payload.type}=${payload.value}&&limit=10&&page=${payload.indexPage}`
        );
        return [...res.data];
      }
    } catch (error) {
      return error.message;
    }
  }
);

export const booksFindLenght = createAsyncThunk(
  "books/booksFindLenght",
  async (payload) => {
    try {
      const res = await axios.get(
        `${BOOKS_URL}?${payload.type}=${payload.value}`
      );
      return [...res.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const addBook = createAsyncThunk("books/addBook", async (payload) => {
  try {
    await axios.post(`${BOOKS_URL}`, { ...payload });
  } catch (error) {
    return error.message;
  }
});

export const editBook = createAsyncThunk("books/editBook", async (payload) => {
  try {
    await axios.put(`${BOOKS_URL}/${payload.id}`, { ...payload });
  } catch (error) {
    return error.message;
  }
});
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (payload) => {
    try {
      await axios.delete(`${BOOKS_URL}/${payload}`);
    } catch (error) {
      return error.message;
    }
  }
);
export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booksList = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBookPerPage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchBookPerPage.fulfilled, (state, action) => {
        state.isLoading = false;

        state.bookPerPage = action.payload;
      })
      .addCase(fetchBookPerPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(booksFindLenght.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(booksFindLenght.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booksFindLenght = action.payload;
      })
      .addCase(booksFindLenght.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
