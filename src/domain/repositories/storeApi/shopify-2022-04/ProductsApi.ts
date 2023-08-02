import axios from "axios";
import { IShopProductsApi } from "../../../../contracts/apis/ShopProductsApi";

export class Shopify202204ProductsApi implements IShopProductsApi {
  private apiKey: string = `${process.env.STORE_API_KEY}`;
  private apiUrl: string = `${process.env.STORE_API_URL}`;

  async fetchProducts(startDate?: Date | null): Promise<any[]> {
    const url = `${this.apiUrl}/products.json`;

    if (startDate) {
      startDate.setMilliseconds(startDate.getMilliseconds() + 1);
    }
    
    try {
      const response = await axios.get(url, {
        headers: { 'X-Shopify-Access-Token': this.apiKey },
        params: { created_at_min: startDate, order: 'created_at asc' }
      });

      const data = response.data.products as any[];
      return data;
    } catch (error: any) {
      console.error('Error fetching products:', error?.message);
      return [];
    }
  }
}
