import api from '../index';

export type PublicGeneralSettings = {
    siteName: string;
    siteDescription: string;
    logo: string;
    favicon: string;
    theme: string;
    language: string;
    currency: string;
    timezone: string;
};

export type PublicContactSettings = {
    companyName: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    socialMedia: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        tiktok?: string;
        zalo?: string;
    };
};

// Get public general settings (no authentication required)
export async function get_public_general_settings() {
    const { data } = await api.get('/public/general-settings');
    return (data?.data?.settings || data?.settings || data) as PublicGeneralSettings;
}

// Get public contact settings (no authentication required)
export async function get_public_contact_settings() {
    const { data } = await api.get('/public/contact-settings');
    return (data?.data?.settings || data?.settings || data) as PublicContactSettings;
}
