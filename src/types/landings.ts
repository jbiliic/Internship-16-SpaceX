export interface Landing {
    name: string;
    date: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
    isSuccessful: boolean;
    rocketId: string;
}
export const mapLanding = (data: any): Landing => ({
    name: data.name,
    date: data.date_utc,
    description: data.details || 'No description available.',
    imageUrl: data.docs.links.patch.large || '',
    videoUrl: data.docs.webcast || '',
    isSuccessful: data.success,
    rocketId: data.rocket,
});