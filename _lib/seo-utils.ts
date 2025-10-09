import strainData from "@/_data/strains-data.json";

export function generateProductSchema(strain: {
  title: string;
  description: string[];
  price: number;
  inStock: boolean;
  images: string[];
  type: string;
  tac?: string;
  effects?: string;
  yield?: string;
  floweringTime?: string;
  terpeneProfile?: string;
}) {
  const description = strain.description.join(" ").slice(0, 300);

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: strain.title,
    description: description,
    brand: {
      "@type": "Brand",
      name: "Clone Kings",
    },
    category: "Cannabis Clone",
    offers: {
      "@type": "Offer",
      price: strain.price,
      priceCurrency: "ZAR",
      availability: strain.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Clone Kings",
      },
    },
    image: strain.images.map(img => `https://www.clonekings.co.za${img}`),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Strain Type",
        value: strain.type,
      },
      ...(strain.tac
        ? [
            {
              "@type": "PropertyValue",
              name: "Total Active Cannabinoids",
              value: strain.tac,
            },
          ]
        : []),
      ...(strain.effects
        ? [
            {
              "@type": "PropertyValue",
              name: "Effects",
              value: strain.effects,
            },
          ]
        : []),
      ...(strain.yield
        ? [
            {
              "@type": "PropertyValue",
              name: "Yield",
              value: strain.yield,
            },
          ]
        : []),
      ...(strain.floweringTime
        ? [
            {
              "@type": "PropertyValue",
              name: "Flowering Time",
              value: strain.floweringTime,
            },
          ]
        : []),
      ...(strain.terpeneProfile
        ? [
            {
              "@type": "PropertyValue",
              name: "Terpene Profile",
              value: strain.terpeneProfile,
            },
          ]
        : []),
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org/",
    "@type": "Organization",
    name: "Clone Kings",
    description: "Premium cannabis clones and genetics in South Africa",
    url: "https://www.clonekings.co.za",
    logo: "https://www.clonekings.co.za/logo.webp",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@clonekings.co.za",
    },
    sameAs: [],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Clone Kings",
    description: "Premium cannabis clones and genetics in South Africa",
    url: "https://www.clonekings.co.za",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.clonekings.co.za/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org/",
    "@type": "LocalBusiness",
    name: "Clone Kings",
    description: "Premium cannabis clones and genetics in South Africa",
    url: "https://www.clonekings.co.za",
    telephone: "+27 123 456 789",
    email: "info@clonekings.co.za",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
    },
    openingHours: "Mo-Su 00:00-23:59",
    acceptsReservations: false,
  };
}

export function getAllStrainSlugs() {
  return strainData.map((strain) => strain.title.toLowerCase().replace(/\s+/g, "-"));
}

export function getStrainBySlug(slug: string) {
  return strainData.find(
    (strain) => strain.title.toLowerCase().replace(/\s+/g, "-") === slug
  );
}