import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductServices from "../../services/ProductServices";

interface Dimension {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface Filter {
  id: string;
  key: string;
  isMultiSelect: boolean;
  filterData: {
    id: string;
    name: string;
    logoUrl: string;
  }[];
}

interface GetDataRequestSchema {
  searchQuery?: string;
  sortingField?: string;
  sortingDir?: "asc" | "desc";
  pageNumber?: number;
  pageSize?: number;
}

export interface AddProductsRequest extends Record<string, unknown> {
  title: string;
  description: string;
  price: string;
  category: string;
}

interface ProductsState {
  products: ProductsResponse | null;
  filters: { [key: string]: Filter[] };
  loading: boolean;
  error: string | undefined | unknown;
}

const initialState: ProductsState = {
  filters: {},
  products: null,
  loading: false,
  error: undefined,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (data: GetDataRequestSchema, { rejectWithValue }) => {
    try {
      const mappedRequest = {
        limit: data.pageSize ?? 10,
        skip: (data.pageNumber ?? 1 - 1) * (data.pageSize ?? 12),
        sortBy: data.sortingField ?? "price",
        order: data.sortingDir ?? "asc",
      };

      const res = await ProductServices.getAllProducts(mappedRequest);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (data: GetDataRequestSchema, { rejectWithValue }) => {
    try {
      const mappedRequest = {
        limit: data.pageSize ?? 10,
        skip: (data.pageNumber ?? 1 - 1) * (data.pageSize ?? 12),
        sortBy: data.sortingField ?? "price",
        order: data.sortingDir ?? "asc",
        search: data.searchQuery ?? "",
      };

      const res = await ProductServices.searchProducts(mappedRequest);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (data: AddProductsRequest, { rejectWithValue }) => {
    try {
      const mappedRequest = {
        title: data.title ?? "",
        description: data.description ?? "",
        price: data.price ?? "",
        category: data.category ?? "",
      };

      const res = await ProductServices.addNewProduct(mappedRequest);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<ProductsResponse>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addNewProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        if (state.products) {
          state.products.products.push(action.payload); 
        }
      })      
      .addCase(addNewProduct.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        searchProducts.fulfilled,
        (state, action: PayloadAction<ProductsResponse>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(searchProducts.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default products.reducer;
