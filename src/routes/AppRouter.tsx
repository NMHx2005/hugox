import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Client Pages
import {
    HomePage,
    FeaturedPage,
    AboutPage,
    CategoriesPage,
    ProductsPage,
    ProductDetailPage,
    NewsPage,
    NewsDetailPage,
    ReviewsPage,
    ReviewDetailPage,
    ContactPage,
    CartPage,
    CheckoutPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    DynamicCategoryPage,
} from '../pages/client';
import SearchPage from '../pages/client/SearchPage';

// Admin Pages
import {
    DashboardPage,
    AdminLoginPage,
    ProductListPage,
    ProductCreatePage,
    ProductEditPage,
    CategoryListPage,
    CategoryFormPage,
    CustomerListPage,
    CustomerDetailPage,
    NewsListPage,
    NewsFormPage,
    UserListPage,
    UserFormPage,
    GeneralSettingsPage,
    PaymentSettingsPage,
} from '../pages/admin';


const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Client Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/featured" element={<FeaturedPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/reviews/:id" element={<ReviewDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Dynamic Category Routes */}
                <Route path="/categories/:categorySlug" element={<DynamicCategoryPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<DashboardPage />} />
                <Route path="/admin/dashboard" element={<DashboardPage />} />

                {/* Admin Product Routes */}
                <Route path="/admin/products" element={<ProductListPage />} />
                <Route path="/admin/products/create" element={<ProductCreatePage />} />
                <Route path="/admin/products/:id/edit" element={<ProductEditPage />} />

                {/* Admin Category Routes */}
                <Route path="/admin/categories" element={<CategoryListPage />} />
                <Route path="/admin/categories/create" element={<CategoryFormPage />} />
                <Route path="/admin/categories/:id/edit" element={<CategoryFormPage />} />

                {/* Admin Customer Routes */}
                <Route path="/admin/customers" element={<CustomerListPage />} />
                <Route path="/admin/customers/:id" element={<CustomerDetailPage />} />

                {/* Admin News Routes */}
                <Route path="/admin/news" element={<NewsListPage />} />
                <Route path="/admin/news/create" element={<NewsFormPage />} />
                <Route path="/admin/news/:id/edit" element={<NewsFormPage />} />

                {/* Admin User Routes */}
                <Route path="/admin/users" element={<UserListPage />} />
                <Route path="/admin/users/create" element={<UserFormPage />} />
                <Route path="/admin/users/:id/edit" element={<UserFormPage />} />

                {/* Admin Settings Routes */}
                <Route path="/admin/settings/general" element={<GeneralSettingsPage />} />
                <Route path="/admin/settings/payment" element={<PaymentSettingsPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
