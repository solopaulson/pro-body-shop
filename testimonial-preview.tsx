"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

// This is a preview of the testimonial slideshow component
export default function TestimonialPreview() {
  // Sample reviews for preview
  const reviews = [
    {
      name: "Catherine A.",
      date: "January 16, 2025",
      text: "I highly recommend Pro Body Shop for any auto body repair needs! They delivered great work on my vehicle, restoring it to perfection.",
    },
    {
      name: "Judith H.",
      date: "July 17, 2024",
      text: "They are a great family-run business—my car was repaired in short order and looks fabulous.",
    },
    {
      name: "Leland S.",
      date: "November 8, 2023",
      text: "I just had a rear panel replaced on a 2020 Honda CRV. The result was like new, including touching up a scratch on another part of the car so that it is virtually unnoticeable.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1))
  }

  // Set up auto-scrolling
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentIndex, isPaused])

  return (
    <div className="bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Star className="mr-2" /> Customer Testimonials
      </h2>

      <div
        className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">What Our Customers Say</h3>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>

        <div className="relative min-h-[200px] md:min-h-[180px]">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`absolute w-full transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <p className="mb-4 italic text-gray-200">"{review.text}"</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span className="font-bold text-white">{review.name}</span>
                {review.date && <span>{review.date}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-red-500" : "bg-gray-600"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full hover:bg-black/70 transition-colors"
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full hover:bg-black/70 transition-colors"
          onClick={nextSlide}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

