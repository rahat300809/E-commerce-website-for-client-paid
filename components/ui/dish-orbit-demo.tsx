"use client"

import React from "react"
import DishOrbitCarousel, { type Dish } from "./dish-orbit-carousel"

export const samplePreorderDishes: Dish[] = [
  {
    title: "AeroKnit Pro",
    subtitle: "UCL Elite Match Kit",
    eyebrow: "#1 Most Reserved Preorder",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&auto=format&fit=crop&q=80",
    rating: 4.9,
    chef: "ZENVY Athletic Lab",
    kitchen: "Dhaka • Limited Run",
    description: "Engineered with four-way stretch AeroKnit ventilation, heat-pressed tournament starball badge, and pro-spec moisture absorption.",
    likes: 1240,
    ingredients: ["100% Recycled Poly", "Micro-mesh side vents", "Silicone Crest"],
    accent: "#0f172a"
  },
  {
    title: "Midnight Phantom",
    subtitle: "Retro Edition Kit",
    eyebrow: "#2 High-Demand Drop",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&auto=format&fit=crop&q=80",
    rating: 4.8,
    chef: "Master Tailor & Design Team",
    kitchen: "Dhaka • Exclusive Batch",
    description: "Monochrome anthracite styling with iridescent foil badges and double-knit athletic ribbed collar.",
    likes: 980,
    ingredients: ["Anti-pilling weave", "UV Guard 50+", "Official typography"],
    accent: "#D12053"
  },
  {
    title: "Solar Crimson",
    subtitle: "Away Striker Jersey",
    eyebrow: "#3 Upcoming Tournament Kit",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&auto=format&fit=crop&q=80",
    rating: 4.9,
    chef: "Performance Division",
    kitchen: "Dhaka • Pro Match Grade",
    description: "Vibrant high-contrast gradient inspired by European competition nights. Tailored ergonomic slim athletic fit.",
    likes: 1450,
    ingredients: ["Vented jacquard", "Laser-cut holes", "Anti-sweat yarn"],
    accent: "#EA580C"
  },
  {
    title: "Vapor Electric",
    subtitle: "Third Alternate Kit",
    eyebrow: "#4 Collector's Preorder",
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=900&auto=format&fit=crop&q=80",
    rating: 5.0,
    chef: "Special Projects Studio",
    kitchen: "Dhaka • Numbered Edition",
    description: "Electrifying hyper-violet accents on obsidian base. Complete with authentic serial numbering and luxury display box.",
    likes: 2100,
    ingredients: ["AeroReady Tech", "Embroidered stars", "Sublimated weave"],
    accent: "#7C3AED"
  }
]

export const DishOrbitCarouselDemo = () => {
  return (
    <section className="w-full min-h-screen bg-neutral-950 text-white relative">
      <DishOrbitCarousel
        dishes={samplePreorderDishes}
        height="100vh"
        loop={true}
        onOrder={(dish, idx) => {
          console.log(`Preordered dish: ${dish.title} at index ${idx}`)
        }}
      />
    </section>
  )
}

export default DishOrbitCarouselDemo

