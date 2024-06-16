import { Link, useParams } from 'react-router-dom'
import { getOneMissingCatApi, FoundCatsApi } from '../apis/api-cats'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { MissingCat } from '../../models/cats'
import { useState } from 'react'
import Nav from './Nav'
import logoSrc from '../images/MP-Logo-Black.svg'

export default function SingleCat() {
  const { catId } = useParams<{ catId: string }>()
  // State for clicked image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loadingTimePassed, setLoadingTimePassed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimePassed(true)
    }, 1000) // Set the loading time in milliseconds (e.g., 3000ms or 3 seconds)

    return () => clearTimeout(timer) // Cleanup the timer on component unmount
  }, [])

  const {
    data: missingcats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['missing_cats', catId],
    queryFn: () => getOneMissingCatApi(Number(catId)),
  })

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
        <img src="/client/images/catGif4.gif" alt="" />
        <h1 className="loading-heading">Just a Sec!!</h1>
      </div>
    )
  }
  const backgroundColour = 'none'
  const itemColour = '#030303'
  const borderColour = '#030303'
  const imageUrls = missingcats.missingImageUrl.split(',')

  const microChipBool = Boolean(missingcats.microchip)

  return (
    <>
      <Nav
        backgroundColour={backgroundColour}
        itemColour={itemColour}
        borderColour={borderColour}
        navLogoSrc={logoSrc}
      />
      <section className="single-cat">
        <div className="single-cat__left">
          <div className="single-cat__img">
            <div className="single-cat__img-left">
              {imageUrls.map((imageUrl, index) => (
                <button
                  key={index}
                  className={`single-cat-img-btn ${
                    index === selectedImageIndex ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={`/${imageUrl}`}
                    alt={`Cat ${index + 1}`}
                    className="single-cat-btn-img"
                  />
                </button>
              ))}
            </div>
            {selectedImageIndex !== null && (
              <div className="single-cat__img-right">
                <img
                  src={`/${imageUrls[selectedImageIndex]}`}
                  alt={`Selected Cat`}
                  className="single-cat-img"
                />
              </div>
            )}
          </div>
        </div>
        <div className="single-cat__right">
          <div className="single-cat__header">
            <div className="single-cat__heading">
              <h1 className="single-cat-heading">{missingcats.catName}</h1>
              <div className="single-cat-back">
                <Link className="single-cat-link" to="/missingcats">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                  All Cats
                </Link>
              </div>
            </div>
            <h2 className="single-cat-subheading">{missingcats.location}</h2>
          </div>
          <div className="single-cat__description">
            <h3 className="single-cat-info-heading">Description</h3>
            <p className="single-cat-description">{missingcats.description}</p>
          </div>
          <div className="single-cat__table">
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Last Seen</h3>
              <p className="single-cat-info-body">
                {missingcats.dateLost.toString().slice(0,10)}
              </p>
            </div>
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Breed</h3>
              <p className="single-cat-info-body">{missingcats.breed}</p>
            </div>
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Colour</h3>
              <p className="single-cat-info-body">{missingcats.color}</p>
            </div>
            {microChipBool && (
              <>
                <div className="single-cat__section">
                  <h3 className="single-cat-info-heading">Microchipped?</h3>
                  <p className="single-cat-info-body">Yes</p>
                </div>
                <div className="single-cat__section">
                  <h3 className="single-cat-info-heading">Microchip Number</h3>
                  <p className="single-cat-info-body">
                    {missingcats.microChipNumber}
                  </p>
                </div>
              </>
            )}
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Owner Email</h3>
              <p className="single-cat-info-body">
                {missingcats.missingCatEmail}
              </p>
            </div>
            <div className="single-cat__section">
              <h3 className="single-cat-info-heading">Owner Mobile</h3>
              <p className="single-cat-info-body">
                {missingcats.missingCatPhone}
              </p>
            </div>
          </div>
          <div className="single-cat__links">
            <div className="single-cat__link">
              <Link className="single-cat-link" to={`/sightings/${catId}`}>
                Sightings
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
            <div className="single-cat__link">
              <button
                className="single-cat-link-btn"
                onClick={() => FoundCatsApi(Number(catId), false)}
              >
                Mark Cat As Found
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
