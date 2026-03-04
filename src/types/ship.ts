export interface Ship {
    id: string;
    name: string;
    type: string;
    roles: string[];
    active: boolean;
    homePort: string;
    yearBuilt: number | null;
    massKg: number | null;
    imageUrl: string | null;
}

export const mapShip = (data: any): Ship => ({
    id: data.id,
    name: data.name,
    type: data.type,
    roles: data.roles || [],
    active: data.active ?? false,
    homePort: data.home_port,
    yearBuilt: data.year_built,
    massKg: data.mass_kg,
    imageUrl: data.image,
});