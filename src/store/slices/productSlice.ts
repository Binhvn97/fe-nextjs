import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "@/services/productService";

export const getProducts = createAsyncThunk("products/getAll", async () => {
  const response = await fetchProducts();
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
