export class Order {
  id: string;
  platform_id: string;
  line_items: { product_id: string | null; }[]

  constructor({
    id,
    platform_id,
    line_items
  }: {
    id: string,
    platform_id: number,
    line_items: { product_id: number | null }[]
  }) {
    this.id = id
    this.platform_id = String(platform_id)
    this.line_items = this.mapLineItems(line_items)
  }

  private mapLineItems(line_items: { product_id: number | null; }[]): { product_id: string | null; }[] {
    const array: { product_id: string | null; }[] = []
    line_items.map(item => {
      array.push({ product_id: item.product_id ? String(item.product_id) : null })
    })
    return array
  }
}