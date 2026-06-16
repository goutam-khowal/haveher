import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative">
      {/* 1. Only keep our beautiful custom premium header strip */}
      {/* <Nav /> */}
      
      {/* 2. Page viewport wrapper */}
      <main className="relative min-h-[80vh] bg-berry-bg/5">
        {children}
      </main>

      {/* 3. Drop our clean categories footer matrix */}
      {/* <Footer /> */}
    </div>
  )
}