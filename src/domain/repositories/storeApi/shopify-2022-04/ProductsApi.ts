import axios from "axios";
import { IShopProductsApi } from "../../../../contracts/apis/ShopProductsApi";

export class Shopify202204ProductsApi implements IShopProductsApi {
  private apiKey: string = `${process.env.STORE_API_KEY}`;
  private apiUrl: string = `${process.env.STORE_API_URL}`;

  async fetchProducts({ startDate, nextPageToken }: { startDate?: Date | null, nextPageToken?: string }): Promise<{ products: any[], nextPageToken: string | null }> {
    const url = `${this.apiUrl}/products.json`;

    if (startDate) {
      startDate.setSeconds(startDate.getSeconds() + 1);
    }

    const response = await axios.get(url, {
      headers: { 'X-Shopify-Access-Token': this.apiKey },
      params: {
        page_info: nextPageToken || null,
        ...(!nextPageToken && {
          created_at_min: startDate,
          order: 'created_at asc',
        }
        ),
      }
    });

    const products = response.data.products as any[];
    const newNextPageToken = this.extractNextPageToken(response.headers.link)
    return { products, nextPageToken: newNextPageToken };
  }

  private extractNextPageToken(headerLink: string): string | null {
    const links = headerLink?.split(',');
    if(!links) return null
    let nextPageInfoToken = null;
    const pageInfoRegex = /page_info=([^<&>]+)/;

    links.forEach((link) => {
      const [url, relation] = link.split(';');

      if (relation.includes('rel="next"')) {
        const pageInfoMatch = pageInfoRegex.exec(url);
        if (pageInfoMatch) {
          nextPageInfoToken = pageInfoMatch[1];
        }
      }
    });

    return nextPageInfoToken;
  }
}
