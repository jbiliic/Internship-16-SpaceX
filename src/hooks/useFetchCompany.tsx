import client from '../api/client.ts';
import { useEffect, useState } from 'react';
import { type Company } from '../types/company.ts';
import { mapCompany } from '../types/company.ts';

export const useFetchCompany = () => {
    const [companyData, setCompanyData] = useState<Company | null>(null);
    const [companyError, setCompanyError] = useState<string | null>(null);
    const [companyLoading, setCompanyLoading] = useState<boolean>(false);

    const fetchCompanyData = async () => {
        setCompanyLoading(true);
        const [data, error] = await client.get('/company');
        if (error) {
            setCompanyError(error);
            setCompanyData(null);
        } else {
            setCompanyData(mapCompany(data));
            setCompanyError(null);
        }
        setCompanyLoading(false);
    };
    useEffect(() => {
        fetchCompanyData();
    }, []);
    return { companyData, companyError, companyLoading };
}
