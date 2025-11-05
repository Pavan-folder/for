import { Card } from "@/components/ui/card";
import { FileText, Users, Microscope } from "lucide-react";

const features = [
  {
    icon: Microscope,
    title: "Clinical Trials",
    description: "Access thousands of clinical trials tailored to your condition with AI-powered matching and detailed summaries.",
  },
  {
    icon: Users,
    title: "Expert Network",
    description: "Connect with leading researchers and health experts in your area of interest or medical condition.",
  },
  {
    icon: FileText,
    title: "Research Publications",
    description: "Stay up-to-date with the latest medical research and publications from top journals worldwide.",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CuraLink simplifies medical research discovery for both patients seeking treatment and researchers advancing science.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover-elevate" data-testid={`card-feature-${index}`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
