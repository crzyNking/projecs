import './Home.css'

const LOGO_URL =
  'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

export function Home() {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="home-brand">
          <img className="home-brand-logo" src={LOGO_URL} alt="Cebu Eastern College Logo" />
          <div className="home-brand-text">
            <div className="home-title">Cebu Eastern College</div>
            <div className="home-subtitle">Leon Kilat St., Cebu City</div>
          </div>
        </div>

        <nav className="home-nav">
          <a href="#" className="active">Home</a>
          <a href="#" className="home-dropdown">Programs <i className="fa-solid fa-chevron-down" /></a>
          <a href="#" className="home-dropdown">Services <i className="fa-solid fa-chevron-down" /></a>
          <a href="#" className="home-dropdown">Enrollment <i className="fa-solid fa-chevron-down" /></a>
          <a href="#" className="home-dropdown">About <i className="fa-solid fa-chevron-down" /></a>
        </nav>

        <div />
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="chinese-title">宿務 東方 學院</div>
        <div className="hero-card-wrapper">
          <h1>
            Excellence in Education
            <br />
            since 1915
          </h1>
          <p>
            Be part of the Easternian Community, where quality education is less
            expensive. Join Cebu City&apos;s premier institution for holistic
            development.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn hero-btn-primary">Log In</button>
            <button className="hero-btn hero-btn-outline">Sign Up</button>
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="academics">
        <h2 className="section-title">Academic Excellence</h2>
        <p className="section-subtitle">
          Comprehensive educational programs designed to nurture future leaders.
        </p>

        <div className="cards-grid">
          <div className="home-card">
            <div className="icon-box">
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <h3>Basic Education</h3>
            <p>
              A strong foundation for lifelong learning, fostering curiosity and
              critical thinking.
            </p>
            <a href="#">
              Learn More <i className="fa-solid fa-arrow-right" />
            </a>
          </div>

          <div className="home-card">
            <div className="icon-box">
              <i className="fa-solid fa-book-open" />
            </div>
            <h3>Senior High</h3>
            <p>
              Specialized tracks preparing students for college and future
              careers.
            </p>
            <a href="#">
              Learn More <i className="fa-solid fa-arrow-right" />
            </a>
          </div>

          <div className="home-card">
            <div className="icon-box">
              <i className="fa-solid fa-building-columns" />
            </div>
            <h3>Higher Education</h3>
            <p>
              Professional degree programs shaping the industry leaders of
              tomorrow.
            </p>
            <a href="#">
              Learn More <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
        </div>
      </section>

      {/* Heritage & Mission */}
      <section className="heritage">
        <div className="heritage-container">
          <div className="heritage-logo">
            <img src={LOGO_URL} alt="Cebu Eastern College Seal" />
          </div>

          <div className="heritage-content">
            <h2>Our Heritage &amp; Mission</h2>
            <p>
              Founded in 1915, Cebu Eastern College has stood as a pillar of
              academic excellence in Cebu City. We remain committed to our
              founding principle: delivering top-tier, quality education that is
              accessible and affordable to all aspiring minds.
            </p>

            <div className="features-grid">
              <div className="feature-item">
                <i className="fa-regular fa-circle-check feature-icon" />
                <div className="feature-text">
                  <h4>Affordable Tuition</h4>
                  <p>Quality education without the heavy financial burden.</p>
                </div>
              </div>

              <div className="feature-item">
                <i className="fa-solid fa-user-group feature-icon" />
                <div className="feature-text">
                  <h4>Diverse Community</h4>
                  <p>
                    A welcoming environment for students from all backgrounds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>
          Join the Easternian
          <br />
          Community
        </h2>
        <p>
          Begin your journey towards academic excellence and personal growth
          today.
        </p>
        <button className="cta-btn">Sign Up Now</button>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-left">
          <div className="footer-contact-item">
            <i className="fa-solid fa-phone" />
            <span>(032) 256 2523</span>
          </div>
          <div className="footer-contact-item">
            <i className="fa-regular fa-envelope" />
            <span>cebueasterncollege1915@yahoo.com</span>
          </div>
          <div className="footer-contact-item">
            <i className="fa-solid fa-location-dot" />
            <span>LEON KILAT ST., Cebu City, Philippines, 6000</span>
          </div>
        </div>

        <div className="footer-center">
          &copy; 2024 Cebu Eastern College. All rights reserved.
        </div>

        <div className="footer-right">
          <h4>Social Media</h4>
          <div className="social-icons">
            <a href="#"><i className="fa-brands fa-facebook" /></a>
            <a href="#"><i className="fa-brands fa-instagram" /></a>
            <a href="#"><i className="fa-brands fa-youtube" /></a>
            <a href="#"><i className="fa-brands fa-linkedin" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
