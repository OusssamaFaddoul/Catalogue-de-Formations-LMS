import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourses } from "../mockAPI/coursesApi";

export const fetchCourses = createAsyncThunk("courses/fetch", async () => {
  const data = await getCourses();
  return data.filter(c => c.status === "Publié");
});

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    search: "",
    selectedCategory: "Tous",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearch, setSelectedCategory } = coursesSlice.actions;
export default coursesSlice.reducer;
