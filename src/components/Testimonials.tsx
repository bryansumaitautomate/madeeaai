import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Madeea.io identified and fixed the invisible revenue leaks we didn't even know existed.",
    author: "Marcus Thorne",
    role: "CEO",
    company: "Apex Labs",
  },
  {
    id: 2,
    quote: "The AI sales infrastructure turned our decaying database into a consistent appointment machine. It's like having a sales team that never sleeps.",
    author: "Sarah Chen",
    role: "Growth Director",
    company: "Vercel",
    featured: true,
  },
  {
    id: 3,
    quote: "Finally, a system that focuses on architecture, not just tools. Our speed-to-lead dropped from hours to seconds instantly.",
    author: "David Hoffman",
    role: "VP of Sales",
    company: "Stripe",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getCardPosition = (index: number) => {
    const diff = index - activeIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(testimonials.length - 1)) return 'right';
    if (diff === -1 || diff === testimonials.length - 1) return 'left';
    return 'hidden';
  };

  const cardVariants = {
    center: {
      x: 0,
      scale: 1,
      zIndex: 30,
      rotateY: 0,
      opacity: 1,
    },
    left: {
      x: '-60%',
      scale: 0.85,
      zIndex: 20,
      rotateY: 15,
      opacity: 0.7,
    },
    right: {
      x: '60%',
      scale: 0.85,
      zIndex: 20,
      rotateY: -15,
      opacity: 0.7,
    },
    hidden: {
      x: 0,
      scale: 0.7,
      zIndex: 10,
      rotateY: 0,
      opacity: 0,
    },
  };

  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="mono-data text-primary mb-3 sm:mb-4 text-xs sm:text-sm">// Client Signals</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-foreground px-2">
            What <span className="italic">leaders</span> are saying
          </h2>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[380px] sm:h-[420px] md:h-[450px] perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => {
                const position = getCardPosition(index);
                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute w-[280px] sm:w-[340px] md:w-[400px] cursor-pointer"
                    initial={cardVariants[position]}
                    animate={cardVariants[position]}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    onClick={() => setActiveIndex(index)}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div
                      className={`
                        glass-infrastructure rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10
                        transition-all duration-300
                        ${position === 'center' 
                          ? 'border-primary/30 shadow-[0_0_40px_hsl(var(--primary)/0.2)]' 
                          : 'border-primary/10'
                        }
                      `}
                    >
                      {/* Featured Badge */}
                      {testimonial.featured && position === 'center' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-3 left-1/2 -translate-x-1/2"
                        >
                          <span className="mono-data px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)] text-[10px] sm:text-xs">
                            Featured
                          </span>
                        </motion.div>
                      )}

                      {/* Quote Icon */}
                      <div className="mb-4 sm:mb-6">
                        <Quote 
                          size={24} 
                          className={`
                            transition-colors duration-300 sm:w-8 sm:h-8
                            ${position === 'center' ? 'text-primary' : 'text-muted-foreground'}
                          `}
                        />
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-base sm:text-lg md:text-xl text-foreground font-light leading-relaxed mb-6 sm:mb-8">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Avatar Ring */}
                        <div className={`
                          relative w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                          bg-gradient-to-br from-primary/30 to-accent/30
                          flex items-center justify-center
                          ${position === 'center' ? 'shadow-[0_0_20px_hsl(var(--primary)/0.2)]' : ''}
                        `}>
                          <div className="absolute inset-0.5 rounded-full bg-card flex items-center justify-center">
                            <span className="text-base sm:text-lg font-semibold text-foreground">
                              {testimonial.author.charAt(0)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold text-foreground text-sm sm:text-base">
                            {testimonial.author}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={handlePrev}
            className="
              p-2.5 sm:p-3 rounded-full 
              bg-card border border-primary/20
              text-primary hover:text-foreground
              hover:border-primary/40 hover:bg-primary/10
              transition-all duration-300
              shadow-[0_0_15px_hsl(var(--primary)/0.1)]
              hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)]
            "
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-1.5 sm:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${index === activeIndex 
                    ? 'w-5 sm:w-6 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }
                `}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="
              p-2.5 sm:p-3 rounded-full 
              bg-card border border-primary/20
              text-primary hover:text-foreground
              hover:border-primary/40 hover:bg-primary/10
              transition-all duration-300
              shadow-[0_0_15px_hsl(var(--primary)/0.1)]
              hover:shadow-[0_0_25px_hsl(var(--primary)/0.2)]
            "
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
