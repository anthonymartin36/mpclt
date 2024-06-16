import { Link } from 'react-router-dom'
// import { SignIn } from './SignIn'
// import { SignOut } from './SignOut'

interface NavColor {
  backgroundColour: string
  itemColour: string
  borderColour: string
  navLogoSrc: string
}

export default function Nav({
  backgroundColour,
  itemColour,
  borderColour,
  navLogoSrc,
}: NavColor) {
  const navStyle = {
    background: backgroundColour,
  }

  const navItemStyle = {
    color: itemColour,
  }

  const navBorderStyle = {
    borderColor: borderColour,
  }

  const navLogo = navLogoSrc

  return (
    <header>
      <nav className="nav" style={navStyle}>
        <div className="nav__left">
          <div className="nav__logo">
            <img
              src={navLogo}
              alt="Missing Purrson Logo"
              className="nav-logo"
            />
          </div>
        </div>
        <div className="nav__right">
          <div className="nav__links">
            <Link className="nav-link" style={navItemStyle} to={'/'}>
              HOME
            </Link>
            <Link className="nav-link" style={navItemStyle} to={'/missingcats'}>
              CATS
            </Link>
          </div>
          <div style={navBorderStyle} className="nav-div"></div>
          <div className="nav__links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            {/* <SignIn /> */}
            {/* <SignOut /> */}
            <a href="#" id="login" style={navItemStyle} className="nav-auth">
              LOGIN
            </a>
            <a href="#" id="signUp" style={navItemStyle} className="nav-auth">
              SIGNUP
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
