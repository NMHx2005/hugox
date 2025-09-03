import React from 'react';
import Layout from '../../components/shared/Layout';
import HeroBanner from '../../components/client/Home/HeroBanner';
import ProductSection from '../../components/client/Home/ProductSection';
import AboutSection from '../../components/client/Home/AboutSection';
import CategoryExploreSection from '../../components/client/Home/CategoryExploreSection';
import PressSection from '../../components/client/Home/PressSection';
import PartnersAwardsSection from '../../components/client/Home/PartnersAwardsSection';
import KOLReviewsSection from '../../components/client/Home/KOLReviewsSection';

const HomePage: React.FC = () => {
    return (
        <Layout>
            <HeroBanner />
            <ProductSection />
            <AboutSection />
            <CategoryExploreSection />
            <PartnersAwardsSection />
            <PressSection />
            <KOLReviewsSection />
            {/* Featured Products */}
            {/* Reviews */}
        </Layout>
    );
};

export default HomePage;
