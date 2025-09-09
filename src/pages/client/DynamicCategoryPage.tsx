import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryPage from './CategoryPage';
import { getProductsByCategory, CATEGORY_CONFIGS } from '../../data/mockProducts';

const DynamicCategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();

    if (!categorySlug || !CATEGORY_CONFIGS[categorySlug as keyof typeof CATEGORY_CONFIGS]) {
        return (
            <div>
                <h1>Danh mục không tồn tại</h1>
                <p>Vui lòng kiểm tra lại đường dẫn.</p>
            </div>
        );
    }

    const config = CATEGORY_CONFIGS[categorySlug as keyof typeof CATEGORY_CONFIGS];
    const products = getProductsByCategory(categorySlug);

    return (
        <CategoryPage
            categoryName={config.name}
            bannerImage={config.bannerImage}
            products={products}
        />
    );
};

export default DynamicCategoryPage;
