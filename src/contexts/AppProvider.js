import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { get_categories } from '../api/client/categories';
import { get_public_general_settings, get_public_contact_settings } from '../api/client/public';
import { AppContext } from './AppContext';
export const AppProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [generalSettings, setGeneralSettings] = useState(null);
    const [contactSettings, setContactSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                // Set default values first
                setCategories([]);
                setGeneralSettings(null);
                setContactSettings(null);
                const [categoriesData, generalData, contactData] = await Promise.all([
                    get_categories().catch(() => []),
                    get_public_general_settings().catch(() => null),
                    get_public_contact_settings().catch(() => null)
                ]);
                setCategories(categoriesData);
                setGeneralSettings(generalData);
                setContactSettings(contactData);
            }
            catch (err) {
                console.error('Error loading app data:', err);
                setError(err instanceof Error ? err.message : 'Failed to load data');
                // Set empty defaults on error
                setCategories([]);
                setGeneralSettings(null);
                setContactSettings(null);
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);
    const value = {
        categories,
        generalSettings,
        contactSettings,
        loading,
        error
    };
    return (_jsx(AppContext.Provider, { value: value, children: children }));
};
