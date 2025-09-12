import React, { useState, useEffect, ReactNode } from 'react';
import { get_categories } from '../api/client/categories';
import { get_public_general_settings, get_public_contact_settings } from '../api/client/public';
import { AppContext, AppContextType } from './AppContext';

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<AppContextType['categories']>([]);
    const [generalSettings, setGeneralSettings] = useState<AppContextType['generalSettings']>(null);
    const [contactSettings, setContactSettings] = useState<AppContextType['contactSettings']>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            } catch (err) {
                console.error('Error loading app data:', err);
                setError(err instanceof Error ? err.message : 'Failed to load data');
                // Set empty defaults on error
                setCategories([]);
                setGeneralSettings(null);
                setContactSettings(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const value: AppContextType = {
        categories,
        generalSettings,
        contactSettings,
        loading,
        error
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
