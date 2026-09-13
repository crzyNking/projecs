import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] overflow-x-hidden">
      <Header />

      <main className="pt-[120px] pb-16 sm:pb-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] font-bold text-[#0b1b42] mb-4">Privacy Policy</h1>
            <p className="text-[#666] text-[13px] leading-relaxed max-w-[600px] mx-auto">
              We are committed to safeguarding the personal data of our students, parents, staff, alumni, and applicants through responsible collection, storage, and protection practices.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-8 sm:p-12 space-y-8">
            <section>
              <h2 className="text-[#0b1b42] text-[1.1rem] font-bold mb-3">Information We Collect</h2>
              <p className="text-[#555] text-[13px] leading-[1.8]">
                We collect personal information necessary for enrollment, academic records, and school operations. This includes names, addresses, contact details, academic history, and other relevant information required to provide quality educational services.
              </p>
            </section>

            <section>
              <h2 className="text-[#0b1b42] text-[1.1rem] font-bold mb-3">How We Use Your Information</h2>
              <p className="text-[#555] text-[13px] leading-[1.8]">
                Your information is used solely for educational purposes, including enrollment processing, academic record management, communication regarding school activities, and compliance with government reporting requirements.
              </p>
            </section>

            <section>
              <h2 className="text-[#0b1b42] text-[1.1rem] font-bold mb-3">Data Protection</h2>
              <p className="text-[#555] text-[13px] leading-[1.8]">
                We implement appropriate technical and organizational security measures to protect personal data against unauthorized access, alteration, disclosure, or destruction. Our systems are regularly updated to maintain the highest level of data security.
              </p>
            </section>

            <section>
              <h2 className="text-[#0b1b42] text-[1.1rem] font-bold mb-3">Third-Party Disclosure</h2>
              <p className="text-[#555] text-[13px] leading-[1.8]">
                We do not sell, trade, or otherwise transfer personal information to outside parties. This does not include trusted third parties who assist in operating the school, conducting business, or servicing students, provided those parties agree to keep information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-[#0b1b42] text-[1.1rem] font-bold mb-3">Your Rights</h2>
              <p className="text-[#555] text-[13px] leading-[1.8]">
                Students, parents, and staff have the right to access, correct, or request deletion of their personal data. For inquiries or concerns about your data, please contact the school administration.
              </p>
            </section>

            <section>
              <h2 className="text-[#0b1b42] text-[1.1rem] font-bold mb-3">Contact Us</h2>
              <p className="text-[#555] text-[13px] leading-[1.8]">
                If you have any questions about this Privacy Policy, please contact us at cebueasterncollege1915@yahoo.com or visit our campus at Leon Kilat St., Cebu City.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
