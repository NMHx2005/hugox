import api from './index';
// Upload single image
export async function upload_image(file, endpoint) {
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
export async function upload_product_image(file) {
    return upload_image(file, 'products/single');
}
// Upload multiple product images
export async function upload_product_images(files) {
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
export async function upload_news_image(file) {
    return upload_image(file, 'news/single');
}
// Upload avatar
export async function upload_avatar(file) {
    return upload_image(file, 'avatars');
}
// Upload category image
export async function upload_category_image(file) {
    return upload_image(file, 'categories');
}
// Upload settings logo
export async function upload_settings_logo(file) {
    return upload_image(file, 'settings/logo');
}
// Upload settings favicon
export async function upload_settings_favicon(file) {
    return upload_image(file, 'settings/favicon');
}
// Delete image
export async function delete_image(public_id) {
    await api.delete(`/upload/${public_id}`);
}
// Get image info
export async function get_image_info(public_id) {
    const { data } = await api.get(`/upload/${public_id}/info`);
    return data;
}
// Transform image
export async function transform_image(public_id, transformations) {
    const { data } = await api.get(`/upload/${public_id}/transform`, { params: transformations });
    return data;
}
