// import { listCategories } from "@lib/data/categories"
// import { listCollections } from "@lib/data/collections"
// import { Text, clx } from "@modules/common/components/ui"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"

// export default async function Footer() {
//   const { collections } = await listCollections({
//     fields: "*products",
//   })
//   const productCategories = await listCategories()

//   // FIX: Pehle sirf Main Categories filter karein, taaki sub-categories loop ko block na karein
//   const rootCategories =
//     productCategories?.filter((c) => !c.parent_category) || []

//   return (
//     <footer className="border-t border-gray-100 bg-white w-full">
//       <div className="content-container flex flex-col w-full">
//         <div className="flex flex-col gap-y-12 md:flex-row items-start justify-between py-16 lg:py-24">
//           {/* Brand & Social Section */}
//           <div className="flex flex-col max-w-sm">
//             <LocalizedClientLink
//               href="/"
//               className="text-2xl font-bold tracking-widest text-berry-primary uppercase hover:text-berry-dark transition-colors mb-4"
//             >
//               HaveHer
//             </LocalizedClientLink>
//             <Text className="text-sm text-gray-500 mb-6 leading-relaxed">
//               Premium ethnic and contemporary fashion for the modern woman.
//               Elegance, crafted for every occasion.
//             </Text>

//             {/* Instagram Social Link */}
//             <div className="flex items-center gap-4">
//               <a
//                 href="https://www.instagram.com/haveher.in?utm_source=qr&igsh=d2U2cm54dHFtbGVn"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-gray-400 hover:text-berry-primary transition-colors"
//                 aria-label="Instagram"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                   <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                   <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Links Grid */}
//           <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
//             {/* Categories (Dynamic) */}
//             {rootCategories.length > 0 && (
//               <div className="flex flex-col gap-y-4">
//                 <span className="font-semibold text-gray-900 tracking-wide uppercase text-xs">
//                   Shop
//                 </span>
//                 <ul className="grid grid-cols-1 gap-3">
//                   {/* Map over the filtered root categories cleanly up to 10 entries */}
//                   {rootCategories.slice(0, 10).map((c) => {
//                     const children =
//                       c.category_children?.map((child) => ({
//                         name: child.name,
//                         handle: child.handle,
//                         id: child.id,
//                       })) || null

//                     return (
//                       <li className="flex flex-col gap-2" key={c.id}>
//                         <LocalizedClientLink
//                           className={clx(
//                             "text-gray-500 hover:text-berry-primary transition-colors",
//                             children &&
//                               children.length > 0 &&
//                               "font-medium text-gray-700"
//                           )}
//                           href={`/categories/${c.handle}`}
//                         >
//                           {c.name}
//                         </LocalizedClientLink>

//                         {children && children.length > 0 && (
//                           <ul className="grid grid-cols-1 ml-3 gap-2 mt-1">
//                             {children.map((child) => (
//                               <li key={child.id}>
//                                 <LocalizedClientLink
//                                   className="text-gray-500 hover:text-berry-primary transition-colors"
//                                   href={`/categories/${child.handle}`}
//                                 >
//                                   {child.name}
//                                 </LocalizedClientLink>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </div>
//             )}

//             {/* Collections (Dynamic) */}
//             {collections && collections.length > 0 && (
//               <div className="flex flex-col gap-y-4">
//                 <span className="font-semibold text-gray-900 tracking-wide uppercase text-xs">
//                   Collections
//                 </span>
//                 <ul
//                   className={clx("grid grid-cols-1 gap-3", {
//                     "grid-cols-2": (collections?.length || 0) > 3,
//                   })}
//                 >
//                   {collections?.slice(0, 6).map((c) => (
//                     <li key={c.id}>
//                       <LocalizedClientLink
//                         className="text-gray-500 hover:text-berry-primary transition-colors"
//                         href={`/collections/${c.handle}`}
//                       >
//                         {c.title}
//                       </LocalizedClientLink>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Support & Legal (Static) */}
//             <div className="flex flex-col gap-y-4">
//               <span className="font-semibold text-gray-900 tracking-wide uppercase text-xs">
//                 Support & Legal
//               </span>
//               <ul className="grid grid-cols-1 gap-3 text-gray-500">
//                 <li>
//                   <LocalizedClientLink
//                     href="/about"
//                     className="hover:text-berry-primary transition-colors"
//                   >
//                     About Us
//                   </LocalizedClientLink>
//                 </li>
//                 <li>
//                   <LocalizedClientLink
//                     href="/contact"
//                     className="hover:text-berry-primary transition-colors"
//                   >
//                     Contact Us
//                   </LocalizedClientLink>
//                 </li>
//                 <li>
//                   <LocalizedClientLink
//                     href="/returns"
//                     className="hover:text-berry-primary transition-colors"
//                   >
//                     Returns & Exchanges
//                   </LocalizedClientLink>
//                 </li>
//                 <li>
//                   <LocalizedClientLink
//                     href="/terms"
//                     className="hover:text-berry-primary transition-colors"
//                   >
//                     Terms & Conditions
//                   </LocalizedClientLink>
//                 </li>
//                 <li>
//                   <LocalizedClientLink
//                     href="/privacy"
//                     className="hover:text-berry-primary transition-colors"
//                   >
//                     Privacy Policy
//                   </LocalizedClientLink>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Copyright Bar */}
//         <div className="flex flex-col md:flex-row w-full mb-8 pt-8 border-t border-gray-100 justify-between items-center text-gray-400 text-xs">
//           <Text>
//             © {new Date().getFullYear()} HaveHer. All rights reserved.
//           </Text>
//           <Text className="mt-2 md:mt-0">Secure Payments via Razorpay</Text>
//         </div>
//       </div>
//     </footer>
//   )
// }
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  // Filter out sub-categories to keep the root menu ultra-clean
  const rootCategories =
    productCategories?.filter((c) => !c.parent_category) || []

  return (
    <footer className="border-t border-gray-100 bg-white w-full font-sans text-[#3A1A2A]">
      <div className="content-container flex flex-col w-full max-w-5xl mx-auto px-4">
        <div className="flex flex-col gap-y-12 md:flex-row items-start justify-between py-16 lg:py-24">
          {/* =========================================================================
             👑 ENLARGED BRAND BRAND LOGO INJECTION: Mirroring the exact premium navbar configuration
             ========================================================================= */}
          <div className="flex flex-col max-w-sm text-left">
            <LocalizedClientLink
              href="/"
              className="flex items-center justify-start transition-opacity hover:opacity-85 focus:outline-none mb-4 w-44 h-16 relative"
            >
              <Image
                src="/haveher-logo.png"
                alt="HaveHer Couture"
                fill
                priority
                className="object-contain object-left"
              />
            </LocalizedClientLink>

            <Text className="text-sm text-gray-500 mb-6 leading-relaxed">
              Premium ethnic and contemporary fashion for the modern woman.
              Elegance, crafted for every occasion.
            </Text>

            {/* Instagram Social Link */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/haveher.in?utm_source=qr&igsh=d2U2cm54dHFtbGVn"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#D45C88] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid Architecture */}
          <div className="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 text-left">
            {/* Categories Menu */}
            {rootCategories.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="font-bold text-[#3A1A2A] tracking-widest uppercase text-xs">
                  Shop
                </span>
                <ul className="grid grid-cols-1 gap-3">
                  {rootCategories.slice(0, 10).map((c) => {
                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li className="flex flex-col gap-2" key={c.id}>
                        <LocalizedClientLink
                          className={clx(
                            "text-gray-500 hover:text-[#D45C88] transition-colors font-medium",
                            children && children.length > 0 && "text-[#3A1A2A]"
                          )}
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>

                        {children && children.length > 0 && (
                          <ul className="grid grid-cols-1 ml-3 gap-2 mt-1 border-l border-pink-100/40 pl-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="text-gray-400 hover:text-[#D45C88] transition-colors text-xs"
                                  href={`/categories/${child.handle}`}
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections Menu */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="font-bold text-[#3A1A2A] tracking-widest uppercase text-xs">
                  Collections
                </span>
                <ul
                  className={clx("grid grid-cols-1 gap-3", {
                    "grid-cols-1": (collections?.length || 0) <= 3,
                  })}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-gray-500 hover:text-[#D45C88] transition-colors font-medium"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Support & Legal (Static) */}
            <div className="flex flex-col gap-y-4">
              <span className="font-bold text-[#3A1A2A] tracking-widest uppercase text-xs">
                Support & Legal
              </span>
              <ul className="grid grid-cols-1 gap-3 text-gray-500 font-medium">
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="hover:text-[#D45C88] transition-colors"
                  >
                    About Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="hover:text-[#D45C88] transition-colors"
                  >
                    Contact Us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/returns"
                    className="hover:text-[#D45C88] transition-colors"
                  >
                    Returns & Exchanges
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/terms"
                    className="hover:text-[#D45C88] transition-colors"
                  >
                    Terms & Conditions
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/privacy"
                    className="hover:text-[#D45C88] transition-colors"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="flex flex-col md:flex-row w-full mb-8 pt-8 border-t border-gray-100 justify-between items-center text-gray-400 text-xs tracking-wider">
          <Text className="font-medium">
            © {new Date().getFullYear()} HaveHer Couture. All rights reserved.
          </Text>
          <Text className="mt-2 md:mt-0 font-bold uppercase text-[10px] tracking-widest text-[#3A1A2A]/40">
            Secure Payments via Razorpay
          </Text>
        </div>
      </div>
    </footer>
  )
}
