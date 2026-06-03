import { I18nProvider } from "@/santen/I18nProvider";
import SantenHome from "@/santen/SantenHome";
import { dictionaries } from "@/santen/i18n";

const zh = dictionaries["zh-CN"];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: zh.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a
    }
  }))
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "参命 Santen 高端东方命理预约咨询",
  provider: {
    "@type": "Person",
    name: zh.brand.founder
  },
  serviceType: "婚恋合盘、事业财运、六爻测事、命盘详批、取名择吉",
  areaServed: "Worldwide",
  description: zh.brand.description,
  offers: zh.services.items.map((service) => ({
    "@type": "Offer",
    name: service.title,
    priceCurrency: "CNY",
    price: service.price.replace(/[^\d]/g, "") || undefined,
    description: `${service.scene}。${service.description}`
  }))
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <I18nProvider>
        <SantenHome />
      </I18nProvider>
    </>
  );
}
