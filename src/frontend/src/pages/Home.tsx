import { JourneyAbout } from "@/components/sections/JourneyAbout";
import { JourneyContact } from "@/components/sections/JourneyContact";
import { JourneyGallery } from "@/components/sections/JourneyGallery";
import { JourneyIntro } from "@/components/sections/JourneyIntro";
import { JourneyMilestones } from "@/components/sections/JourneyMilestones";
import { JourneySkills } from "@/components/sections/JourneySkills";

export default function Home() {
  return (
    <div data-ocid="home.journey">
      <JourneyIntro />
      <JourneyAbout />
      <JourneyGallery />
      <JourneySkills />
      <JourneyMilestones />
      <JourneyContact />
    </div>
  );
}
