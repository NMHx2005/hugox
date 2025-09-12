import api from './index';

export type UploadResponse = {
    success: boolean;
    data: {
        url: string;
        public_id: string;
        secure_url: string;
        width: number;
        height: number;
        format: string;
        bytes: number;
    };
};

// Upload single image
export async function upload_image(file: File, endpoint: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await api.post(`/upload/${endpoint}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return data;
}

// Upload product image
export async function upload_product_image(file: File): Promise<UploadResponse> {
    return upload_image(file, 'products/single');
}

// Upload multiple product images
export async function upload_product_images(files: File[]): Promise<UploadResponse> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    const { data } = await api.post('/upload/products/multiple', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return data;
}

// Upload news image
export async function upload_news_image(file: File): Promise<UploadResponse> {
    return upload_image(file, 'news/single');
}

// Upload avatar
export async function upload_avatar(file: File): Promise<UploadResponse> {
    return upload_image(file, 'avatars');
}

// Upload category image
export async function upload_category_image(file: File): Promise<UploadResponse> {
    return upload_image(file, 'categories');
}

// Upload settings logo
export async function upload_settings_logo(file: File): Promise<UploadResponse> {
    return upload_image(file, 'settings/logo');
}

// Upload settings favicon
export async function upload_settings_favicon(file: File): Promise<UploadResponse> {
    return upload_image(file, 'settings/favicon');
}

// Delete image
export async function delete_image(public_id: string): Promise<void> {
    await api.delete(`/upload/${public_id}`);
}

// Get image info
export async function get_image_info(public_id: string): Promise<any> {
    const { data } = await api.get(`/upload/${public_id}/info`);
    return data;
}

// Transform image
export async function transform_image(public_id: string, transformations: any): Promise<any> {
    const { data } = await api.get(`/upload/${public_id}/transform`, { params: transformations });
    return data;
}
