export interface Rocket {
    id: string;
    name: string;
    active: boolean;
    description: string;
    images: string[];
    height: number;
    mass: number;
    cost: number;
    successRate: number;
}
export const mapRocket = (data: any): Rocket => ({
    id: data.id,
    name: data.name,
    active: data.active,
    description: data.description,
    images: data.flickr_images,
    height: data.height.meters,
    mass: data.mass.kg,
    cost: data.cost_per_launch,
    successRate: data.success_rate_pct,
});