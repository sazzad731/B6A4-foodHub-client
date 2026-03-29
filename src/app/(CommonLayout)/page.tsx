import Categories from "@/components/modules/home/Categories";
import FeaturedMeals from "@/components/modules/home/FeaturedMeals";
import Hero from "@/components/modules/home/Hero";
import HowItWorks from "@/components/modules/home/HowItWorks";
import ProviderCTA from "@/components/modules/home/ProviderCTA";
import Reviews from "@/components/modules/home/Reviews";
import SearchBar from "@/components/modules/home/SearchBar";



export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <Categories />
      <FeaturedMeals />
      <HowItWorks />
      <Reviews />
      <ProviderCTA />
    </>
  );
}
