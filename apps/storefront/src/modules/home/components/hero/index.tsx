import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="w-full bg-berry-bg">
      {/* 1. SPLIT-GRID HERO BANNER */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 flex flex-col md:flex-row items-center gap-12">
        {/* Left Column: Text & CTA */}
        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-berry-light text-berry-dark rounded-full">
            New Arrival Collection
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-tight text-berry-dark mb-6 leading-tight">
            Feel her <br className="hidden md:block" /> this season.
          </h1>
          <p className="font-sans font-light text-lg md:text-xl text-berry-dark/80 max-w-md mb-10 mx-auto md:mx-0">
            Uncompromising elegance. Premium ethnic and western wear for the
            modern woman.
          </p>
          <Link
            href="/store"
            className="inline-block bg-berry-primary text-white font-medium px-8 py-4 rounded-full shadow-lg shadow-berry-primary/30 hover:bg-berry-dark transition-all duration-300"
          >
            Shop the Collection
          </Link>
        </div>

        {/* Right Column: Hero Image Placeholder */}
        <div className="flex-1 relative w-full aspect-[4/5] md:aspect-square bg-berry-light/40 rounded-[2rem] overflow-hidden border border-berry-light">
          <Link href="/store">
            <div className="absolute inset-0 flex items-center justify-center text-berry-mid">
              {" "}
              <Image
                src="https://rghkazrivuowvkxrmbhm.supabase.co/storage/v1/object/public/haveher-products/shopping%20(3)-01KRXRGP227E5VXJMN1E0A492D.webp"
                className="object-cover w-full h-full  object-top"
                alt="Placeholder"
                width={600}
                height={600}
              ></Image>
            </div>
          </Link>
          <div className="absolute top-6 right-6 bg-berry-accent text-white font-bold px-4 py-2 rounded-full transform rotate-3 shadow-md">
            20% OFF
          </div>
        </div>
      </section>

      {/* 2. PROMOTIONAL BANNER */}
      <section className="w-full bg-gradient-to-r from-berry-dark to-berry-primary py-8 px-4 text-center shadow-inner">
        <p className="font-serif text-white text-xl md:text-2xl mb-4 italic">
          Elevate your wardrobe. Use code at checkout:
        </p>
        <div className="inline-block border-2 border-dashed border-white/50 bg-white/10 px-8 py-3 rounded-full text-white font-bold tracking-widest text-lg md:text-xl">
          HAVEHER20
        </div>
      </section>
    </div>
  )
}

export default Hero
