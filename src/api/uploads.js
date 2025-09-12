import api from './index';
export async function upload_product_image(file) {
    const form = new FormData();
    form.append('image', file);
    const { data } = await api.post('/upload/products/single', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    const url = (data?.data?.secure_url
        || data?.data?.url
        || data?.secure_url
        || data?.url);
    if (!url)
        throw new Error('Không nhận được URL ảnh từ server');
    return url;
}
