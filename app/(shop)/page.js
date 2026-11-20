import Hero from '@/components/Hero';
import SaleTabs from '@/components/SaleTabs';
import { CategoryTiles, Campaign, Story, Lookbook } from '@/components/HomeSections';

export default function Home() {
  return (
    <>
      <Hero />
      <SaleTabs />
      <CategoryTiles />
      <Campaign />
      <Lookbook />
      <Story />
    </>
  );
}
