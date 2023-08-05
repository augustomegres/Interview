import axios from "axios";
import { IShopProductsApi } from "../../../../contracts/apis/ShopProductsApi";

export class Shopify202204ProductsApi implements IShopProductsApi {
  private apiKey: string = `${process.env.STORE_API_KEY}`;
  private apiUrl: string = `${process.env.STORE_API_URL}`;
  private apiCallLimit: number = 40;

  async fetchProducts({ startDate, nextPageToken }: { startDate?: Date | null, nextPageToken?: string }): Promise<{ products: any[], nextPageToken: string | null, callLimitExceded: boolean }> {
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

    const callLimit = this.getCallLimit(response.headers['x-shopify-shop-api-call-limit'])

    const products = response.data.products as any[];
    const newNextPageToken = this.extractNextPageToken(response.headers.link)
    const callLimitExceded = callLimit >= this.apiCallLimit 
    return { products, nextPageToken: newNextPageToken, callLimitExceded };
  }

  private extractNextPageToken(headerLink: string): string | null {
    const links = headerLink?.split(',');
    if (!links) return null
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

  private getCallLimit(callLimit: string): number {
    const limit = Number(callLimit.split('/')[0])
    return limit
  }
}
