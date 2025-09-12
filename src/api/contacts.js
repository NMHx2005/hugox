import api from './index';
export async function get_admin_contacts(params) {
    const { data } = await api.get('/admin/contacts', { params });
    const items = (data?.data?.contacts || data?.contacts || []);
    const pagination = (data?.data?.pagination || data?.pagination);
    return { items, pagination };
}
export async function get_admin_contact(id) {
    const { data } = await api.get(`/admin/contacts/${id}`);
    return (data?.data?.contact || data?.contact || data);
}
export async function update_admin_contact_status(id, status, notes) {
    const { data } = await api.put(`/admin/contacts/${id}/status`, { status, notes });
    return (data?.data?.contact || data?.contact || data);
}
export async function add_admin_contact_notes(id, notes) {
    const { data } = await api.post(`/admin/contacts/${id}/notes`, { notes });
    return (data?.data?.contact || data?.contact || data);
}
export async function delete_admin_contact(id) {
    const { data } = await api.delete(`/admin/contacts/${id}`);
    return data;
}
