import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Layout from '../../components/shared/Layout';
import HeroBanner from '../../components/client/Home/HeroBanner';
import ProductSection from '../../components/client/Home/ProductSection';
import AboutSection from '../../components/client/Home/AboutSection';
import CategoryExploreSection from '../../components/client/Home/CategoryExploreSection';
import PressSection from '../../components/client/Home/PressSection';
// import PartnersAwardsSection from '../../components/client/Home/PartnersAwardsSection';
// import KOLReviewsSection from '../../components/client/Home/KOLReviewsSection';
const HomePage = () => {
    return (_jsxs(Layout, { children: [_jsx(HeroBanner, {}), _jsx(ProductSection, {}), _jsx(AboutSection, {}), _jsx(CategoryExploreSection, {}), _jsx(PressSection, {})] }));
};
export default HomePage;
