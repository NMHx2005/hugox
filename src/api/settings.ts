import api from './index';

export type GeneralSettings = {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    adminEmail: string;
    supportEmail: string;
    phone: string;
    address: string;
    zalo: string;
    facebook: string;
    youtube: string;
    logo: string;
    favicon: string;
    theme: string;
    language: string;
    currency: string;
    timezone: string;
};

export type PaymentSettings = {
    vnpay: {
        enabled: boolean;
        merchantId: string;
        secretKey: string;
        returnUrl: string;
        cancelUrl: string;
    };
    momo: {
        enabled: boolean;
        partnerCode: string;
        accessKey: string;
        secretKey: string;
    };
    cod: {
        enabled: boolean;
        fee: number;
    };
};

export type ShippingSettings = {
    freeShippingThreshold: number;
    shippingRates: Array<{
        name: string;
        price: number;
        estimatedDays: string;
    }>;
};

export type SEOSettings = {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    googleAnalytics: string;
    facebookPixel: string;
};

export type AllSettings = {
    general: GeneralSettings;
    payment: PaymentSettings;
    shipping: ShippingSettings;
    seo: SEOSettings;
};

// Get all settings
export async function get_admin_settings() {
    const { data } = await api.get('/admin/settings');
    return (data?.data?.settings || data?.settings || data) as AllSettings;
}

// Update all settings
export async function update_admin_settings(section: keyof AllSettings, data: any) {
    const response = await api.put('/admin/settings', { section, data });
    return (response.data?.data?.settings || response.data?.settings || response.data) as AllSettings;
}

// Get general settings
export async function get_admin_general_settings() {
    const { data } = await api.get('/admin/settings/general');
    return (data?.data?.settings || data?.settings || data) as GeneralSettings;
}

// Update general settings
export async function update_admin_general_settings(settings: Partial<GeneralSettings>) {
    const { data } = await api.put('/admin/settings/general', settings);
    return (data?.data?.settings || data?.settings || data) as GeneralSettings;
}

// Get contact settings
export async function get_admin_contact_settings() {
    const { data } = await api.get('/admin/settings/contact');
    return (data?.data?.settings || data?.settings || data) as GeneralSettings;
}

// Update contact settings
export async function update_admin_contact_settings(settings: Partial<GeneralSettings>) {
    const { data } = await api.put('/admin/settings/contact', settings);
    return (data?.data?.settings || data?.settings || data) as GeneralSettings;
}
