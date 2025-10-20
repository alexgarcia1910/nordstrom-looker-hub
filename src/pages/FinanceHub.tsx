import { NavbarV2 } from "@/components/v2/NavbarV2";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Key, BookOpen, ExternalLink, ChevronRight } from "lucide-react";

const FinanceHub = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const resourceCards = [
    {
      icon: Key,
      title: "Finance Access & Onboarding",
      description: "Get access instructions and setup materials for Finance tools.",
      ctaText: "Open SharePoint",
      link: "https://finance-onboarding.sharepoint.com",
      label: "Personalized link for your domain."
    },
    {
      icon: BookOpen,
      title: "Finance Training & Resources",
      description: "Learn policies, dashboards, and reports specific to Finance.",
      ctaText: "Open Confluence",
      link: "https://finance-training.confluence.com",
      label: "Personalized link for your domain."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavbarV2 
        onAdminToggle={() => setIsAdminMode(!isAdminMode)} 
        isAdminMode={isAdminMode}
        isScrolled={isScrolled}
      />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Breadcrumb with animated journey indicator */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-sm">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-muted-foreground animate-pulse" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">Finance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-tight text-foreground mb-3">
            Finance Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Your domain-specific dashboards, onboarding, and resources.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {resourceCards.map((card, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <card.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    asChild
                    className="w-full"
                  >
                    <a 
                      href={card.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      {card.ctaText}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  {/* Label */}
                  <p className="text-xs text-muted-foreground italic">
                    {card.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FinanceHub;
