import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { FavoriteButton } from '@/components/monuments/favorite-button'
import { ImageGallery } from '@/components/monuments/image-gallery'
import { 
  IndianRupee, 
  Clock, 
  Sun, 
  Plane, 
  Train, 
  Accessibility, 
  Camera, 
  ShoppingBag,
  Bath,
  MapPin
} from 'lucide-react'

async function getMonument(slug: string) {
  const monument = await prisma.monument.findUnique({
    where: { slug },
    include: {
      images: true,
      categories: true,
      tags: true,
    },
  })

  if (!monument) {
    notFound()
  }

  return monument
}

export default async function MonumentPage({
  params,
}: {
  params: { slug: string }
}) {
  const monument = await getMonument(params.slug)

  return (
    <div>
      {/* Hero Section with Main Image */}
      <div className="relative h-[50vh] w-full">
        {monument.images.length > 0 ? (
          <Image
            src={monument.images[0].url}
            alt={monument.images[0].alt || monument.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold text-white mb-2">{monument.name}</h1>
          <p className="text-gray-200 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {monument.location}
          </p>
        </div>
        <div className="absolute right-4 bottom-4">
          <FavoriteButton 
            slug={monument.slug} 
            className="h-10 w-10"
            iconClassName="w-6 h-6"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-300">{monument.description}</p>
            </section>

            {/* History Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">History</h2>
              <p className="text-gray-600 dark:text-gray-300">{monument.history}</p>
            </section>

            {/* Visitor Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Visitor Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <IndianRupee className="w-5 h-5" />
                    Entry Fee
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>Indians: ₹{monument.entryFee}</p>
                    <p>Foreigners: ₹1100</p>
                    <p>Children under 15: Free</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timings
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>{monument.timings}</p>
                    <p>Closed on Fridays</p>
                    <p>Night viewing available</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Sun className="w-5 h-5" />
                    Best Time to Visit
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>{monument.bestTime}</p>
                    <p>Early morning</p>
                    <p>Sunset hours</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Reach */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Reach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Plane className="w-5 h-5" />
                    By Air
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{monument.howToReach}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Train className="w-5 h-5" />
                    By Train
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Agra Cantt Railway Station is well-connected to major cities.
                  </p>
                </div>
              </div>
            </section>

            {/* Available Facilities */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Available Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5" />
                  <span className="text-sm">Restrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Accessibility className="w-5 h-5" />
                  <span className="text-sm">Wheelchair Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  <span className="text-sm">Photo Spots</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-sm">Gift Shop</span>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <ImageGallery images={monument.images} monumentName={monument.name} />
            </section>
          </div>

          {/* Quick Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Information</h3>
              
              {/* Full Address */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Full Address</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {monument.name},<br />
                  {monument.address},<br />
                  {monument.city}, {monument.state}<br />
                  {monument.country} {monument.state}
                </p>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {monument.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {monument.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 