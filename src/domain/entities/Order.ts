export class Order {
  id: string;
  platform_id: string;
  line_items: { product_id: string; }[]

  constructor({
    id,
    platform_id,
    line_items
  }: {
    id: string,
    platform_id: string | number,
    line_items: { product_id: string | number | null }[]
  }) {
    this.id = id
    this.platform_id = String(platform_id)
    this.line_items = this.mapLineItems(line_items)
  }

  private mapLineItems(line_items: { product_id: string | number | null; }[]): { product_id: string }[] {
    const array: { product_id: string }[] = []
    for (const item of line_items) {
      if (!item.product_id) continue
      array.push({ product_id: String(item.product_id) });
    }
    return array
  }
}