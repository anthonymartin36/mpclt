import { Link } from 'react-router-dom'
import Nav from './Nav'
import logoSrc from '../images/MP-Logo-White.svg'

export default function Home() {
  const backgroundColour = 'none'
  const itemColour = '#f3f3f3'
  const borderColour = '#f3f3f3'

  return (
    <>
      <Nav
        backgroundColour={backgroundColour}
        itemColour={itemColour}
        borderColour={borderColour}
        navLogoSrc={logoSrc}
      />
      <section className="landing">
        <div className="landing__left">
          <div className="landing__header">
            <h1 className="landing-heading">Missing Purrson</h1>
            <p className="landing-subheading">Our Goal</p>
          </div>
          <div className="landing__body">
            <p className="landing-body">
              It’s never easy when a member of your family is lost, we’re here
              to act as a dedicated space to list your missing Kitty!
            </p>
          </div>
          <div className="landing__links">
            <Link to="/addcat" className="landing-link">
              List a cat
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </Link>
            <Link to="/missingcats" className="landing-link">
              Missing Cats
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </Link>
            <Link to="/foundcats" className="landing-link">
              Found Cats
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="landing__right"></div>
      </section>
    </>
  )
}
