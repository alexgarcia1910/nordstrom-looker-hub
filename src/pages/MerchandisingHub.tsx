import { NavbarV2 } from "@/components/v2/NavbarV2";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ClipboardList, BookOpen, ExternalLink, ChevronRight, BarChart3, Search, MessageSquare } from "lucide-react";

const MerchandisingHub = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const resourceCards = [
    {
      icon: ClipboardList,
      title: "Merch Access & Onboarding",
      description: "Get access to merchandising systems and setup guides.",
      ctaText: "Open SharePoint",
      link: "https://merch-onboarding.sharepoint.com",
      label: "Personalized link for your domain."
    },
    {
      icon: BookOpen,
      title: "Merch Training & Resources",
      description: "Learn about product data, inventory tools, and reporting best practices.",
      ctaText: "Open Confluence",
      link: "https://merch-training.confluence.com",
      label: "Personalized link for your domain."
    }
  ];

  const toolCards = [
    {
      icon: BarChart3,
      title: "Dashboards",
      subtitle: "View curated merchandising dashboards and reports.",
      ctaText: "Open Dashboards",
      link: "https://nordstrom.looker.com/dashboards/merchandising",
      badge: "Production",
      badgeVariant: "default" as const,
      isComingSoon: false
    },
    {
      icon: Search,
      title: "Explore",
      subtitle: "Run ad-hoc analyses or build custom merchandising queries.",
      ctaText: "Go to Explore",
      link: "https://nordstrom.looker.com/explore/merchandising",
      badge: "Live",
      badgeVariant: "secondary" as const,
      isComingSoon: false,
      isHighlighted: true
    },
    {
      icon: MessageSquare,
      title: "Explore Assistant",
      subtitle: "Ask questions and get instant insights — launching soon.",
      ctaText: "Coming Soon",
      link: "#",
      badge: "Coming Soon",
      badgeVariant: "outline" as const,
      isComingSoon: true
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
                <BreadcrumbPage className="text-sm">Merchandising</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-tight text-foreground mb-3">
            Merchandising Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Your domain-specific dashboards, onboarding, and resources.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
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

        {/* Merchandising Tools & Data Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-light tracking-tight text-foreground mb-2">
              Merchandising Tools & Data
            </h2>
            <p className="text-base text-muted-foreground">
              Access dashboards, run your own queries, or try the new Explore Assistant.
            </p>
          </div>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {toolCards.map((card, index) => (
              <Card 
                key={index}
                className={`group relative transition-all duration-300 ${
                  card.isComingSoon 
                    ? 'cursor-not-allowed' 
                    : 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                } ${
                  card.isHighlighted 
                    ? 'border-primary/50 hover:border-primary' 
                    : ''
                }`}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Badge */}
                    {card.badge && (
                      <Badge 
                        variant={card.badgeVariant}
                        className="absolute top-4 right-4"
                      >
                        {card.badge}
                      </Badge>
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      card.isComingSoon 
                        ? 'bg-muted' 
                        : 'bg-primary/10 group-hover:bg-primary/20'
                    }`}>
                      <card.icon className={`h-10 w-10 ${
                        card.isComingSoon ? 'text-muted-foreground' : 'text-primary'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* CTA Button */}
                    {card.isComingSoon ? (
                      <Button 
                        disabled
                        className="w-full"
                      >
                        {card.ctaText}
                      </Button>
                    ) : (
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
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MerchandisingHub;
