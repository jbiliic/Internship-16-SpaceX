export interface Company {
    name: string;
    founder: string;
    founded: number;
    employees: number;
    location: string;
    summary: string;
}
export const mapCompany = (data: any): Company => ({
    name: data.name,
    founder: data.founder,
    founded: data.founded,
    employees: data.employees,
    location: data.headquarters.city + ', ' + data.headquarters.state,
    summary: data.summary,
});