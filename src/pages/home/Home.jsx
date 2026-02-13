import { useRef, useEffect } from "react";
import Layout from "../../Layout";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import {
  useGetLatestProductsQuery,
  useGetCategoriesTreeQuery,
} from "../../redux/queries/productApi";
import Product from "../../components/Product";
import ProductCategorySection from "../../components/ProductCategorySection";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import FeaturedProducts from "../../components/FeaturedProducts";
// import { CollectionsSection } from "../../components/CollectionsSection.jsx";
import { MaterialsSection } from "../../components/MaterialSection";
import { HeroSection } from "../../components/HeroSection";

import X from "../../components/X";
import Y from "../../components/Y";
import HeroSection2 from "../../components/HeroSection2";
import HeroSection3 from "../../components/HeroSection3";
import HeroSection5 from "../../components/HeroSection5";
import HeroSection6 from "../../components/HeroSection6";
import HeroSection7 from "../../components/HeroSection7";

import Luxery from "../../components/Luxery.jsx";
import SmoothScroll from "../../components/SmoothScroll";
import { HeritageSection } from "../../components/Heritage.jsx";
import HeroSection8 from "../../components/HeroSection8.jsx";
import Fahad from "../../components/Fahad.jsx";
import Clone from "../../components/Clone.jsx";
import New from "../../components/New.jsx";
import Test from "../../components/Test.jsx";
function Home() {
  const { data: products, isLoading, refetch } = useGetLatestProductsQuery();

  const prevStockRef = useRef([]);
  useEffect(() => {
    if (products) {
      const currentStock = products.map((p) => p.countInStock);
      const prevStock = prevStockRef.current;
      const stockChanged = currentStock.some((stock, index) => stock !== prevStock[index]);
      if (stockChanged) refetch();
      prevStockRef.current = currentStock;
    }
  }, [products, refetch]);

  return (
    <Layout>
      <SmoothScroll>
        {/* <Clone /> */}
        {/* <HeroSection8 /> */}
        {/* <Fahad /> */}
        {/* <Luxery /> */}
        {/* <Test /> */}
        <HeroSection />
        {/* <HeroSection3 /> */}
        {/* <HeroSection5 /> */}
        {/* <HeroSection6 /> */}
        {/* <HeroSection7 /> */}
        <New />
        {/* <FeaturedProducts products={products} isLoading={isLoading} /> */}

        <HeritageSection />
      </SmoothScroll>
      {/* <MaterialsSection /> */}
      {/* <X /> */}
      {/* <Y /> */}
    </Layout>
  );
}

export default Home;
