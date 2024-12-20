import { AddProductsRequest, Product, ProductsResponse } from "../redux/reducers/productsReducer";
import { makeRequest, method } from "./ServiceConfig"; 

interface GetAllProductsRequest {
  limit: number;
  skip: number;
  sortBy: string;
  order: "asc" | "desc";
}

interface SearchProductsRequest {
  search: string;
  limit: number;
  skip: number;
  sortBy: string;
  order: "asc" | "desc";
}


const ProductServices = {
  async getAllProducts(req: GetAllProductsRequest): Promise<ProductsResponse> {
    return await makeRequest<ProductsResponse>(
      `/products?limit=${req.limit}&skip=${req.skip}&sortBy=${req.sortBy}&order=${req.order}`,
      method.GET
    );
  },
  async searchProducts(req: SearchProductsRequest): Promise<ProductsResponse> {
    return await makeRequest<ProductsResponse>(
      `/products/search?q=${req.search}&limit=${req.limit}&skip=${req.skip}&sortBy=${req.sortBy}&order=${req.order}`,
      method.GET
    );
  },
  async addNewProduct(req: AddProductsRequest): Promise<Product> {
    return await makeRequest<Product>(
      `/products/add`,
      method.POST,
      req as Record<string, unknown>
    );
  },
};

export default ProductServices;
