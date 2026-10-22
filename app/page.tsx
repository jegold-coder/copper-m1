import Image from "next/image";
import { ColorSlides } from "@/components/copper/color-slides";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Button } from "@/components/ui/button";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
  type Product,
} from "@/lib/copper/catalog";

const TAGLINE = "From raw ideas to refined answers.";

const CUTOUT_ALT: Record<string, string> = {
  "copper-home":
    "Copper Home smart speaker in woven copper fabric with a round clock display",
  "copper-notes":
    "Copper Notes clip-on recorder in brushed copper with a glowing amber ring",
};

const LIFESTYLE: Record<string, { alt: string; caption: string }> = {
  "copper-home-desert-light.png": {
    alt: "Copper Home speaker on a stone kitchen counter with a desert sunset through the window",
    caption:
      "Copper Home keeps the house running, even when the sun sets over the desert.",
  },
  "copper-notes-stone-desk.png": {
    alt: "Copper Notes recorder standing on a stone desk beside its magnetic charging puck",
    caption: "Copper Notes sits on your desk and charges on a magnetic puck.",
  },
  "copper-notes-golden-hour.png": {
    alt: "Person writing in a notebook with Copper Notes clipped to their shirt pocket",
    caption:
      "Clip it on and catch every lecture or meeting in golden-hour light.",
  },
};

function lifestyleFor(product: Product) {
  return product.lifestyle.map((src) => {
    const file = src.split("/").pop() ?? "";
    return {
      src,
      product,
      alt: LIFESTYLE[file]?.alt ?? `${product.name} in an Arizona home`,
      caption: LIFESTYLE[file]?.caption ?? product.name,
    };
  });
}

export default function Home() {
  const products = getProducts();
  const plans = getPlans();
  const privacy = getPrivacySummary();
  const free = plans.find((p) => p.id === "free")!;
  const plus = plans.find((p) => p.id === "copper-plus")!;
  const showcase = products.flatMap(lifestyleFor);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          data-testid="hero"
          id="top"
          className="bg-secondary scroll-mt-16"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
            <div className="flex flex-col items-start gap-5">
              <h1 className="text-4xl leading-tight font-extrabold text-balance sm:text-5xl">
                Meet Copper: smart help for every Arizona home
              </h1>
              <p className="text-secondary-foreground text-xl">{TAGLINE}</p>
              <Button
                asChild
                size="lg"
                className="h-11 px-6 text-base shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl active:translate-y-0 active:scale-95"
              >
                <a href="#products">See products</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-center gap-2 sm:gap-4">
              {products.map((product) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={
                    CUTOUT_ALT[product.id] ?? `${product.name} product photo`
                  }
                  width={1254}
                  height={1254}
                  priority
                  sizes="(min-width: 1152px) 288px, (min-width: 768px) 25vw, 45vw"
                  className="h-auto w-full object-contain transition-transform duration-300 hover:-translate-y-2 hover:scale-105 motion-safe:animate-[float_6s_ease-in-out_infinite]"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          data-testid="products"
          id="products"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16"
        >
          <h2 className="mb-8 text-3xl font-bold">Our products</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                data-testid="product-card"
                data-product={product.id}
                className="bg-card text-card-foreground flex flex-col gap-4 rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-xl"
              >
                <ColorSlides
                  productName={product.name}
                  src={product.cutout}
                  alt={
                    CUTOUT_ALT[product.id] ?? `${product.name} product photo`
                  }
                  colors={product.colors}
                />
                <div>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.type}</p>
                </div>
                <p className="text-primary text-3xl font-extrabold">
                  {formatUsd(product.priceUsd)}
                </p>
                <ul className="flex flex-col gap-2">
                  {product.features.map((feature) => (
                    <li key={feature.name}>
                      <span className="font-semibold">{feature.name}.</span>{" "}
                      <span className="text-muted-foreground">
                        {feature.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          data-testid="showcase"
          id="showcase"
          className="bg-secondary scroll-mt-16"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
            <h2 className="text-3xl font-bold">Made for life in Arizona</h2>
            {showcase.map((item, i) => (
              <figure
                key={item.src}
                className="grid items-center gap-6 md:grid-cols-2"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={i === 2 ? 1536 : 1672}
                  height={i === 2 ? 1024 : 941}
                  sizes="(min-width: 1152px) 560px, (min-width: 768px) 45vw, 92vw"
                  className={`h-auto w-full rounded-2xl ${i % 2 === 1 ? "md:order-2" : ""}`}
                />
                <figcaption className="text-xl font-semibold">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          data-testid="plus-pricing"
          id="plus"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16"
        >
          <h2 className="mb-8 text-3xl font-bold">Free or Copper Plus</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[free, plus].map((plan) => {
              const isPlus = plan.id === "copper-plus";
              return (
                <div
                  key={plan.id}
                  className={
                    isPlus
                      ? "bg-primary text-primary-foreground flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      : "bg-card text-card-foreground flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  }
                >
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-3xl font-extrabold">
                    {formatUsd(plan.monthlyUsd)}
                    <span className="text-base font-medium">/month</span>
                  </p>
                  <p className="font-semibold">
                    {isPlus
                      ? `${formatUsd(plan.annualUsd)}/year`
                      : "No cost, ever"}
                  </p>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                    <dt className="font-semibold">Memory kept</dt>
                    <dd>{formatMemory(plan.memoryDays)}</dd>
                    <dt className="font-semibold">Notes recording</dt>
                    <dd>{formatNotesHours(plan.notesHoursPerMonth)}</dd>
                    <dt className="font-semibold">Refined answers</dt>
                    <dd>{plan.refinedAnswers ? "Included" : "Not included"}</dd>
                  </dl>
                </div>
              );
            })}
          </div>
        </section>

        <section
          data-testid="privacy-summary"
          id="privacy"
          className="bg-accent text-accent-foreground scroll-mt-16"
        >
          <div className="mx-auto max-w-3xl px-4 py-16">
            <h2 className="mb-2 text-3xl font-bold">
              Your privacy, in plain words
            </h2>
            <p className="mb-6 font-semibold">
              How Copper handles recordings under the {privacy.policy} policy
            </p>
            <ul className="list-disc space-y-3 pl-6 text-lg">
              {privacy.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
