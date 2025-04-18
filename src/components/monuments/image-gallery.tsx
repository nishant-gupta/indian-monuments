"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface ImageGalleryProps {
  images: {
    id: string
    url: string
    alt: string | null
  }[]
  monumentName: string
}

export function ImageGallery({ images, monumentName }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => {
              setCurrentImageIndex(index)
              setIsOpen(true)
            }}
          >
            <Image
              src={image.url}
              alt={image.alt || `${monumentName} view ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 border-none bg-black/95">
          <VisuallyHidden>
            <DialogTitle>
              {monumentName} Image Gallery - Image {currentImageIndex + 1} of {images.length}
            </DialogTitle>
          </VisuallyHidden>

          <div className="relative flex items-center justify-center min-h-[80vh]">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Previous button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            {/* Image */}
            <div className="w-full h-full px-16 py-8">
              <div className="relative w-full h-[70vh]">
                <Image
                  src={images[currentImageIndex].url}
                  alt={
                    images[currentImageIndex].alt ||
                    `${monumentName} view ${currentImageIndex + 1}`
                  }
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Next button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={handleNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 