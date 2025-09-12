import api from './index';
// Get all settings
export async function get_admin_settings() {
    const { data } = await api.get('/admin/settings');
    return (data?.data?.settings || data?.settings || data);
}
// Update all settings
export async function update_admin_settings(section, data) {
    const response = await api.put('/admin/settings', { section, data });
    return (response.data?.data?.settings || response.data?.settings || response.data);
}
// Get general settings
export async function get_admin_general_settings() {
    const { data } = await api.get('/admin/settings/general');
    return (data?.data?.settings || data?.settings || data);
}
// Update general settings
export async function update_admin_general_settings(settings) {
    const { data } = await api.put('/admin/settings/general', settings);
    return (data?.data?.settings || data?.settings || data);
}
// Get contact settings
export async function get_admin_contact_settings() {
    const { data } = await api.get('/admin/settings/contact');
    return (data?.data?.settings || data?.settings || data);
}
// Update contact settings
export async function update_admin_contact_settings(settings) {
    const { data } = await api.put('/admin/settings/contact', settings);
    return (data?.data?.settings || data?.settings || data);
}
