import { createContext, useEffect, useState } from "react";
import { getAllCompaniesFromDB, saveCompanyToDB, deleteCompanyFromDB } from "../utils/indexedDB";

export const CompanyContext = createContext({
    companies: [],
    addCompany: () => { },
    removeCompany: () => { },
});

export const CompanyProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const loadCompanies = async () => {
            const storedCompanies = await getAllCompaniesFromDB();
            setCompanies(storedCompanies);
        };
        loadCompanies();
    }, []);

    const addCompany = async (company) => {
        setCompanies((prev) => {
            const exists = prev.some((c) => c.email === company.email);
            return exists
                ? prev.map((c) => (c.email === company.email ? company : c))
                : [...prev, company];
        });
        await saveCompanyToDB(company);
    };


    const updateCompany = async (updatedCompany) => {
        setCompanies((prev) =>
            prev.map((company) =>
                company.email === updatedCompany.email ? updatedCompany : company
            )
        );
        await saveCompanyToDB(updatedCompany);
    };

    const removeCompany = async (email) => {
        setCompanies((prev) => prev.filter((company) => company.email !== email));
        await deleteCompanyFromDB(email);
    };

    return (
        <CompanyContext.Provider value={{ companies, addCompany, updateCompany, removeCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};
