import api from './index';

export type AdminContact = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    content: string;
    status: 'new' | 'contacted' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    assignedTo?: {
        _id: string;
        name: string;
        email: string;
    };
    notes?: string;
    source: 'website' | 'phone' | 'email' | 'social';
    createdAt: string;
    updatedAt: string;
};

export type AdminPagination = {
    page: number;
    limit: number;
    total: number;
    pages: number;
};

export async function get_admin_contacts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    source?: string;
}) {
    const { data } = await api.get('/admin/contacts', { params });
    const items = (data?.data?.contacts || data?.contacts || []) as AdminContact[];
    const pagination = (data?.data?.pagination || data?.pagination) as AdminPagination | undefined;
    return { items, pagination };
}

export async function get_admin_contact(id: string) {
    const { data } = await api.get(`/admin/contacts/${id}`);
    return (data?.data?.contact || data?.contact || data) as AdminContact;
}

export async function update_admin_contact_status(id: string, status: AdminContact['status'], notes?: string) {
    const { data } = await api.put(`/admin/contacts/${id}/status`, { status, notes });
    return (data?.data?.contact || data?.contact || data) as AdminContact;
}

export async function add_admin_contact_notes(id: string, notes: string) {
    const { data } = await api.post(`/admin/contacts/${id}/notes`, { notes });
    return (data?.data?.contact || data?.contact || data) as AdminContact;
}

export async function delete_admin_contact(id: string) {
    const { data } = await api.delete(`/admin/contacts/${id}`);
    return data as { deleted?: boolean };
}
