import Header from '../components/Header'
import Footer from '../components/Footer'

const sections = [
  {
    num: '1',
    title: 'Data Collection and Usage',
    content: (
      <>
        <p>Cebu Eastern College collects various types of information to provide educational services effectively:</p>
        <ul>
          <li><strong>Contact Information:</strong> Names, addresses, email addresses, and phone numbers.</li>
          <li><strong>Student Records:</strong> Academic history, grades, attendance, and disciplinary records.</li>
          <li><strong>Parent/Guardian Information:</strong> Contact details and employment information where necessary.</li>
        </ul>
        <p>This data is primarily used for educational services, admission processing, communication, and fulfilling legal obligations.</p>
      </>
    ),
  },
  {
    num: '2',
    title: 'Data Security',
    content: (
      <p>We implement robust organizational, physical, and technical measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes secure data storage systems, restricted access protocols, and regular security audits.</p>
    ),
  },
  {
    num: '3',
    title: 'Data Sharing and Disclosure',
    content: (
      <p>Personal data may be shared internally among authorized personnel for legitimate educational and administrative purposes. We do not disclose personal information to external third parties without explicit consent, except when required by law or to authorized service providers under strict confidentiality agreements.</p>
    ),
  },
  {
    num: '4',
    title: 'Data Retention',
    content: (
      <p>We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by statutory retention periods. Once the retention period expires, data is securely disposed of or anonymized.</p>
    ),
  },
  {
    num: '5',
    title: 'Individual Rights',
    content: (
      <>
        <p>Under applicable laws, you have the right to:</p>
        <ul>
          <li><strong>Access:</strong> View the personal data CEC holds about you.</li>
          <li><strong>Correct:</strong> Request updates to inaccurate or incomplete information.</li>
          <li><strong>Inquire:</strong> Learn how your personal data is processed.</li>
          <li><strong>Raise Concerns:</strong> Report issues regarding data handling.</li>
        </ul>
      </>
    ),
  },
  {
    num: '6',
    title: 'Consent',
    content: (
      <p>When consent is required for the collection or processing of personal information, Cebu Eastern College will seek consent in an appropriate and transparent manner. Individuals may withdraw their consent when applicable, subject to legal, contractual, academic, or institutional requirements that may affect the availability of certain services.</p>
    ),
  },
  {
    num: '7',
    title: 'Data Transfer',
    content: (
      <p>When personal information needs to be shared or transferred to authorized parties, Cebu Eastern College will take reasonable measures to ensure that appropriate safeguards are in place and that the transfer complies with applicable data privacy laws and regulations.</p>
    ),
  },
  {
    num: '8',
    title: 'Privacy Awareness & Compliance',
    content: (
      <p>Cebu Eastern College promotes responsible data handling among its faculty, staff, and members of the school community. The institution supports awareness of data privacy responsibilities and works to maintain compliance with relevant privacy laws, policies, and regulations.</p>
    ),
  },
  {
    num: '9',
    title: 'Policy Updates',
    content: (
      <p>This Data Privacy Policy may be reviewed and updated from time to time to reflect changes in institutional practices, legal requirements, and data protection standards. Any significant updates may be communicated through appropriate Cebu Eastern College channels.</p>
    ),
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "linear-gradient(to bottom, rgba(15,48,115,0.95), rgba(9,28,71,0.98)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') center/cover fixed" }}>
      <Header />

      {/* Hero */}
      <section className="pt-[120px] pb-12 sm:pb-20 text-center px-4">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold text-white mb-4 sm:mb-6">Privacy Policy</h2>
          <p className="text-[0.9rem] sm:text-[1.05rem] text-[#e2e8f0] leading-[1.7]">
            We are committed to safeguarding the personal data of our students, parents, staff, alumni, and applicants through responsible collection, storage, and protection practices.
          </p>
        </div>
      </section>

      {/* Content Card */}
      <main className="max-w-[800px] mx-auto px-4 sm:px-6 mb-12 sm:mb-20">
        <div className="bg-white rounded-xl p-6 sm:p-10 md:p-[3.5rem] text-[#0f172a] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">

          {sections.map((section, i) => (
            <div key={section.num}>
              <div className="mb-6 sm:mb-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-8 h-8 bg-[#dbeafe] text-[#1e3a8a] rounded-full flex items-center justify-center text-[0.9rem] font-bold shrink-0">
                    {section.num}
                  </div>
                  <h3 className="text-[1.1rem] sm:text-[1.25rem] font-semibold text-[#102a63]">{section.title}</h3>
                </div>
                <div className="text-[0.85rem] sm:text-[0.95rem] text-[#475569] leading-[1.7] pl-0 sm:pl-11">
                  {section.content}
                </div>
              </div>
              {i < sections.length - 1 && <hr className="border-none border-t border-[#e2e8f0] my-6 sm:my-10" />}
            </div>
          ))}

          {/* Contact Box */}
          <div className="bg-[#f8fafc] rounded-lg p-6 sm:p-8 mt-8">
            <h3 className="text-[1.1rem] sm:text-[1.25rem] font-semibold text-[#102a63] mb-3">Contact Our Data Privacy Officer</h3>
            <p className="text-[0.85rem] sm:text-[0.95rem] text-[#475569] mb-5">
              If you have any questions, concerns, or requests regarding your data privacy rights, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a href="mailto:cebueasterncollege1915@yahoo.com" className="flex items-center gap-2 text-[#102a63] font-medium text-[0.85rem] sm:text-[0.95rem] no-underline hover:text-[#1d4ed8] transition-colors">
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#1d4ed8] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                cebueasterncollege1915@yahoo.com
              </a>
              <a href="tel:0322562523" className="flex items-center gap-2 text-[#102a63] font-medium text-[0.85rem] sm:text-[0.95rem] no-underline hover:text-[#1d4ed8] transition-colors">
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#1d4ed8] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (032) 256 2523
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
