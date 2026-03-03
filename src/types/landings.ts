export interface Landing {
    id: string;
    name: string;
    date: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
    success: boolean;
    rocketId: string;
    upcoming?: boolean;
}
export const mapLanding = (data: any): Landing => ({
    id: data.id,
    name: data.name,
    date: data.date_utc,
    description: data.details || 'No description available.',
    imageUrl: data.links.patch.large || '',
    videoUrl: data.links.webcast || '',
    success: data.success,
    rocketId: data.rocket,
    upcoming: data.upcoming,
});