import { useQuery } from '@tanstack/react-query'
import { getAllMissingCatsApi } from '../apis/api-cats'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import logoSrc from '../images/MP-Logo-Black.svg'

export default function FoundCatList() {
  const {
    data: missingcats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['missing_cats'],
    queryFn: () => {
      return getAllMissingCatsApi()
    },
  })

  const [loadingTimePassed, setLoadingTimePassed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimePassed(true)
    }, 1000) // Set the loading time in milliseconds (e.g., 3000ms or 3 seconds)

    return () => clearTimeout(timer) // Cleanup the timer on component unmount
  }, [])

  if (isError) {
    return (
      <div className="loading">
        <img src="/client/images/catGif1.gif" alt="" />
        <h1 className="loading-heading">Something's broken!</h1>
      </div>
    )
  }

  if (!missingcats || !loadingTimePassed || isLoading) {
    return (
      <div className="loading">
        <img src="/client/images/catGif3.gif" alt="" />
        <h1 className="loading-heading">Just a Sec!!</h1>
      </div>
    )
  }

  const backgroundColour = 'none'
  const itemColour = '#030303'
  const borderColour = '#030303'
  const getImageUrlsArray = (imageUrlString) => {
    if (!imageUrlString) return []
    return imageUrlString.split(',').map((url) => url.trim())
  }

  const filteredFoundCats = missingcats.filter((cat) => cat.catMissing == false)

  return (
    <>
      <Nav
        backgroundColour={backgroundColour}
        itemColour={itemColour}
        borderColour={borderColour}
        navLogoSrc={logoSrc}
      />
      <section className="cats">
        <div className="cats__left">
          <div className="cats-filter">
            <h2 className="cats-filter-header">Filter By</h2>
            <form action="" className="cats-filter-form">
              <div className="cats-filter-form__section">
                <label htmlFor="cats-region" className="cats-filter-form-label">
                  Region
                </label>
                <input
                  type="text"
                  id="cats-region"
                  className="cats-filter-form-input"
                />
              </div>
              <div className="cats-filter-form__section">
                <label htmlFor="cats-city" className="cats-filter-form-label">
                  City
                </label>
                <input
                  type="text"
                  id="cats-city"
                  className="cats-filter-form-input"
                />
              </div>
              <div className="cats-filter-form__section">
                <button className="cats-filter-form-btn" id="catsFilterFormBtn">
                  Search
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="cats__right">
          <div className="cats__header">
            <h1 className="cats-header">
              These Kitties Has Found Their Way Back Home!
            </h1>
          </div>

          <div className="cats__cards">
            {filteredFoundCats.length > 0 ? (
              filteredFoundCats.map((cat) => (
                <div key={cat.catId} className="cats-card">
                  <div className="cats-card__img">
                    <img
                      src={getImageUrlsArray(cat.missingImageUrl)[0]}
                      alt={cat.catName}
                      className="cats-card-img"
                    />
                  </div>
                  <div className="cats-card__info">
                    <h2 className="cats-card-title">{cat.catName}</h2>
                    <p className="cats-card-location">{cat.location}</p>
                    <p className="cats-card-bio">{cat.description}</p>
                    <div className="cats-card__link">
                      {/* <Link
                        className="cats-card-link"
                        to={`/missingcats/singlecat/${cat.catId}`}
                      >
                        More Info
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          width="14"
                          viewBox="0 0 448 512"
                        >
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No found cats at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
