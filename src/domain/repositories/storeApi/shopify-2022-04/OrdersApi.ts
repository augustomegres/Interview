import axios from "axios";
import { IShopOrdersApi } from "../../../../contracts/apis/ShopOrdersApi";

export class Shopify202204OrdersApi implements IShopOrdersApi {
  private apiKey: string = `${process.env.STORE_API_KEY}`;
  private apiUrl: string = `${process.env.STORE_API_URL}`;

  async fetchOrders(startDate?: Date | null): Promise<any[]> {
    const url = `${this.apiUrl}/orders.json`;

    if (startDate) {
      startDate.setSeconds(startDate.getSeconds() + 1);
    }

    const response = await axios.get(url, {
      headers: { 'X-Shopify-Access-Token': this.apiKey },
      params: { created_at_min: startDate, order: 'created_at asc' }
    });

    const data = response.data.orders as any[];
    return data;
  }
}
