"use client"

import { useState, useEffect, useRef } from "react"
import {
  Phone,
  Clock,
  Star,
  MapPin,
  PenToolIcon as Tool,
  Shield,
  Car,
  Truck,
  Sparkles,
  Hammer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

interface Review {
  name: string;
  date: string;
  text: string;
}

interface TestimonialSlideshowProps {
  reviews: Review[];
}

function TestimonialSlideshow({ reviews }: TestimonialSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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
  )
}

export default function Home() {
  // Business information
  const businessInfo = {
    name: "Pro Body Shop",
    phone: "(505) 473-4132",
    address: "2876 Trades West Rd, Santa Fe, NM 87507",
    hours: [
      { day: "Monday", hours: "8:30 AM - 6:00 PM" },
      { day: "Tuesday", hours: "8:30 AM - 6:00 PM" },
      { day: "Wednesday", hours: "8:30 AM - 6:00 PM" },
      { day: "Thursday", hours: "8:30 AM - 6:00 PM" },
      { day: "Friday", hours: "8:30 AM - 6:00 PM" },
      { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    services: [
      { name: "Free Estimates", icon: <Tool className="w-6 h-6" /> },
      { name: "Insurance Company Assistance", icon: <Shield className="w-6 h-6" /> },
      { name: "Lifetime Warranty", icon: <Star className="w-6 h-6" /> },
      { name: "Towing", icon: <Truck className="w-6 h-6" /> },
      { name: "Automotive Glass Replacement", icon: <Car className="w-6 h-6" /> },
      { name: "Detailing", icon: <Sparkles className="w-6 h-6" /> },
      { name: "Paintless Dent Repair", icon: <Hammer className="w-6 h-6" /> },
    ],
    reviews: [
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
      {
        name: "Mike M.",
        date: "October 11, 2023",
        text: "I was there yesterday about a car window that wouldn't close. Turns out it was the button that locks the window in position for when children are in the car. This visit, which cost nothing, saved me a lot of trouble.",
      },
      {
        name: "ASH B.",
        date: "",
        text: "Pro Body Shop did a wonderful job on my car. I shopped all over town and they definitely had the best price, and their work was better than some body work I've had on previous vehicles.",
      },
      {
        name: "James P.",
        date: "",
        text: "They repaired the welds and touched up the paint. They did an excellent job for a reasonable price.",
      },
      {
        name: "Robbi L.",
        date: "",
        text: "I bought a new car in Santa Fe and everything was perfect except for the color. I couldn't find anyone who would paint my new car in two days. The Pro Body Shop took my car without a doubt. They did a fantastic job.",
      },
      {
        name: "S. A.",
        date: "June 14",
        text: "Auto Body Pro 505-473-4132@2876 Trades West Fred Hayas, did a fabulous job on my sedan. Wonderful communication and excellent work.",
      },
      {
        name: "J. S.",
        date: "April 1",
        text: "I scraped the side of my car and it is slightly dented with some paint missing. Auto Body Pro did a fabulous job on my sedan. Wonderful communication and excellent work.",
      },
      {
        name: "Anonymous",
        date: "",
        text: "Pro Body Shop did a wonderful job on my car. I shopped all over town and they definitely had the best price, and their work was better than some body work I've had on previous vehicles.",
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full py-8 px-4 border-b border-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center tracking-tight">{businessInfo.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Map Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <MapPin className="mr-2" /> Our Location
          </h2>
          <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-gray-700 relative">
            <div className="absolute inset-0 bg-gray-800 animate-pulse" id="map-loading" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.2326144345366!2d-105.99468492346177!3d35.66096687259684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87185a60197b43b1%3A0xe9946b7679c1f75a!2sPro%20Body%20Shop!5e0!3m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pro Body Shop Location"
              onLoad={() => {
                const loadingElement = document.getElementById('map-loading');
                if (loadingElement) {
                  loadingElement.style.display = 'none';
                }
              }}
            ></iframe>
          </div>
          <p className="mt-2 text-gray-400 text-center">{businessInfo.address}</p>
        </section>

        {/* Call to Action Section */}
        <section className="mb-12">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl mb-4 text-center">Need auto body repair services?</p>
            <a
              href={`tel:${businessInfo.phone.replace(/[^0-9]/g, "")}`}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl flex items-center justify-center transition-colors duration-200 w-full md:w-auto"
              aria-label={`Call ${businessInfo.phone}`}
            >
              <Phone className="mr-2" /> Call Now: {businessInfo.phone}
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Tool className="mr-2" /> Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {businessInfo.services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-900 p-4 rounded-lg flex flex-col items-center text-center hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="mb-2 text-red-500">{service.icon}</div>
                <h3 className="font-semibold">{service.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Star className="mr-2" /> Customer Reviews
          </h2>
          <TestimonialSlideshow reviews={businessInfo.reviews} />
        </section>

        {/* Hours Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="mr-2" /> Business Hours
          </h2>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessInfo.hours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-semibold">{schedule.day}</span>
                  <span className="text-gray-400">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-400">
          <p className="mb-6">© {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          <div className="w-full flex justify-center">
            <Image
              src="/pro-body-shop-footer-banner.png"
              alt="Pro Body Shop Footer Banner"
              width={1920}
              height={300}
              className="w-full max-w-[1920px] h-auto"
              priority={false}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}