import api from '../index';
// Get public general settings (no authentication required)
export async function get_public_general_settings() {
    const { data } = await api.get('/public/general-settings');
    return (data?.data?.settings || data?.settings || data);
}
// Get public contact settings (no authentication required)
export async function get_public_contact_settings() {
    const { data } = await api.get('/public/contact-settings');
    return (data?.data?.settings || data?.settings || data);
}
