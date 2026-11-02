import React from "react";
import { CircularTestimonials, Testimonial } from "./circular-testimonials";

export const jerseyModelTestimonials: Testimonial[] = [
  {
    quote:
      "The AeroKnit weave feels weightless during 90 minutes on the pitch. The customization precision on the player name and UCL starball badge is unmatched in Bangladesh.",
    name: "Rahim Chowdhury",
    designation: "Dhaka Premier Division Midfielder",
    src:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80",
  },
  {
    quote:
      "Wearing the ZENVY Pro Elite kit for all our tournament matches. The sweat-wicking airflow keeps me cool, and the custom squad numbering never peels or cracks.",
    name: "Tariqul Islam",
    designation: "National League Striker",
    src:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80",
  },
  {
    quote:
      "ZENVY represents the new benchmark for authentic sportswear. The fabric elasticity, tailored athletic slim-fit cut, and delivery speed across Dhaka are sensational.",
    name: "Shahriar Ahmed",
    designation: "Semi-Pro Athlete & Brand Ambassador",
    src:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&q=80",
  },
  {
    quote:
      "From gym training sessions to weekend league games, the jersey holds its shape and color after dozens of washes. Truly an elite kit.",
    name: "Arifur Rahman",
    designation: "CrossFit Coach & Footballer",
    src:
      "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&q=80",
  },
];

export const CircularTestimonialsDemo = () => (
  <section className="w-full">
    {/* Light testimonials section */}
    <div className="bg-[#f7f7fa] p-8 md:p-16 rounded-3xl min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex w-full"
        style={{ maxWidth: "1456px" }}
      >
        <CircularTestimonials
          testimonials={jerseyModelTestimonials}
          autoplay={true}
          colors={{
            name: "#0a0a0a",
            designation: "#454545",
            testimony: "#171717",
            arrowBackground: "#141414",
            arrowForeground: "#f1f1f7",
            arrowHoverBackground: "#00A6FB",
          }}
          fontSizes={{
            name: "24px",
            designation: "14px",
            quote: "16px",
          }}
        />
      </div>
    </div>
  </section>
);

export default CircularTestimonialsDemo;
