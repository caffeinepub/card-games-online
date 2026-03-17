import { CategoryCards } from "@/components/CategoryCards";
import { EmergencySection } from "@/components/EmergencySection";
import { EquipmentSection } from "@/components/EquipmentSection";
import { FoodSection } from "@/components/FoodSection";
import { Hero } from "@/components/Hero";
import { MapSection } from "@/components/MapSection";
import { Navigation } from "@/components/Navigation";
import { PrintableChecklist } from "@/components/PrintableChecklist";
import { QuickTips } from "@/components/QuickTips";
import { SkillsSection } from "@/components/SkillsSection";
import { SurvivalFooter } from "@/components/SurvivalFooter";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal-900 text-cream">
      <Navigation />
      <main>
        <Hero />
        <CategoryCards />
        <FoodSection />
        <EquipmentSection />
        <SkillsSection />
        <MapSection />
        <EmergencySection />
        <QuickTips />
      </main>
      <SurvivalFooter />
      <Toaster position="top-right" />
      <PrintableChecklist />
    </div>
  );
}
