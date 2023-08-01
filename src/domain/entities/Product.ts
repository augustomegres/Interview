export class Product {
	id: string;
	platform_id: string;
	name: string;

	constructor({ id, platform_id, name }: { id: string, platform_id: number, name: string }) {
		this.id = id
		this.platform_id = String(platform_id)
		this.name = name
	}
}