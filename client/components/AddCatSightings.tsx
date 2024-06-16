//AddCatSighting.tsx
import SightedCatMap from './SightedCatMap'
import Location from './Location'

import { useState, useRef, useEffect } from 'react'
//import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { addCatSightingApi, getCatSightingsApi } from '../apis/api-cats'
import { useParams } from 'react-router-dom'
import { SightedCat, NewSightedCat } from '../../models/cats'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import logoSrc from '../images/MP-Logo-Black.svg'

type addressType = {address: string, lat: number, lng: number}

const emptySighting = {
  location: '',
  stringLocation: '',
  lat: 0,
  lng: 0,
  dateSeen: '',
  color: '',
  description: '',
  sightedCatEmail: '',
  sightedCatPhone: '',
  sightedImgUrl: '',
}

interface SightedCatMapProps {
  catSightings: SightedCat[];
}
export default function AddCatSightings() {
  const queryClient = useQueryClient()
  const [formFields, setformFields] = useState(emptySighting)
  const [isFormVisible, setFormVisibility] = useState(false)
  const formData = new FormData()
  const [file, setFile] = useState('')
  const { catIdMc } = useParams()
  const apikey = import.meta.env.VITE_MAPS_API_KEY 

  const [loadingTimePassed, setLoadingTimePassed] = useState(false)
  const [locationField, setLocationField] = useState({address: "", lng: 0, lat: 0}) 
  
  const handleChangeAddress = (newLocationField: addressType) => {
    setLocationField(newLocationField)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimePassed(true)
    }, 1000) // Set the loading time in milliseconds (e.g., 3000ms or 3 seconds)

    return () => clearTimeout(timer) // Cleanup the timer on component unmount
  }, [])

  // const {
  //   data: catsighting,
  //   isLoading,
  //   isError,
  // } = useQuery(['sighted_cats', catIdMc], () => {
  //   return getCatSightingsApi(Number(catIdMc))
  // })
  const {
    data: catsighting,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sighted_cats', catIdMc],
    queryFn: () => getCatSightingsApi(Number(catIdMc)),
  })

  useEffect(() => {
    //console.log("LocationField : " + JSON.stringify(locationField))
  }, [locationField])

  const addCatSightingMutation = useMutation({
    mutationFn: async (sightedCat: NewSightedCat) => {
      await addCatSightingApi(sightedCat, Number(catIdMc))
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['sighted_cats'])
      setformFields(emptySighting)
      setFormVisibility(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //console.log("Lat", typeof(locationField.lat))
    formData.append('location', locationField.address)
    formData.append('lat', locationField.lat)
    formData.append('lng', locationField.lng)
    formData.append('location', locationField.lat + ', '+ locationField.lng)
    formData.append('stringLocation', locationField.address)
    formData.append('dateSeen', formFields.dateSeen)
    formData.append('color', formFields.color)
    formData.append('description', formFields.description)
    formData.append('sightedCatPhone', formFields.sightedCatPhone)
    formData.append('sightedCatEmail', formFields.sightedCatEmail)
    formData.append('file', file)
    try {
      addCatSightingMutation.mutate(formData)
    } catch (error: any) {
      console.log('Error adding cat sighting')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.type === 'file') {
      setFile(e.target.files[0])//console.log('file : ', file)
    } else {
      setformFields({
        ...formFields,
        [e.target.name]: e.target.value,
      })
    }
    //locationField and how to add 
    //console.log("LocationField : " + JSON.stringify(locationField))
  }

  if (isError) {
    return (
      <div className="loading">
        <img src="/client/images/catGif1.gif" alt="" />
        <h1 className="loading-heading">Something's broken!</h1>
      </div>
    )
  }

  if (!catsighting || !loadingTimePassed || isLoading) {
    return (
      <div className="loading">
        <img src="/client/images/catGif5.gif" alt="" />
        <h1 className="loading-heading">Just a Sec!!</h1>
      </div>
    )
  }

  // console.log(catsighting)
  const backgroundColour = 'none'
  const itemColour = '#030303'
  const borderColour = '#030303'
  return (
    <>
      <Nav
        backgroundColour={backgroundColour}
        itemColour={itemColour}
        borderColour={borderColour}
        navLogoSrc={logoSrc}
      />
      <section className="cat-sightings">
        <div className="cat-sightings__left">
          <div className="cat-sightings__map">
            <SightedCatMap catSightings={catsighting} />
          </div>
        </div>
        <div className="cat-sightings__right">
          <div className="cat-sightings__header">
            <h1 className="cat-sightings-heading">Possible Sightings</h1>
            <div className="cat-sightings__btn">
              <Link
                className="single-cat-link single-cat-link--back"
                to={`/missingcats/singlecat/${catIdMc}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
                Back
              </Link>
            </div>
            <div className="cat-sightings__btn">
              <button
                className="cat-sightings-btn"
                onClick={() => setFormVisibility(!isFormVisible)}
              >
                {isFormVisible ? (
                  <>
                    <p> Hide Form</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="12"
                      viewBox="0 0 384 512"
                    >
                      <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                    </svg>
                  </>
                ) : (
                  <>
                    <p>List a sighting</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="12"
                      viewBox="0 0 384 512"
                    >
                      <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
          {isFormVisible ? (
            <div className="cat-sightings__form">
              <div className="cat-sightings-form__header">
                <h2 className="cat-sightings-form-heading">List a Sighting</h2>
              </div>
              <form
                className="cat-sightings-form"
                action="/sightings:id"
                onSubmit={handleSubmit}
                method="POST"
                encType="multipart/form-data"
              >
                <div className="cat-sightings-form__content">
                  <div className="cat-sightings-form__left">
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="location"
                      >
                        LOCATION
                      </label>
                      <Location changeAddress={handleChangeAddress}  />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="dateSeen"
                      >
                        DATE
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="dateSeen"
                        type="date"
                        name="dateSeen"
                        value={formFields.dateSeen}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="color"
                      >
                        COLOR
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="color"
                        type="text"
                        name="color"
                        value={formFields.color}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="description"
                      >
                        DESCRIPTION
                      </label>
                      <textarea
                        className="cat-sightings-form-input"
                        id="description"
                        type="text"
                        cols="30"
                        rows="10"
                        name="description"
                        value={formFields.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="cat-sightings-form__right">
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="sightedCatEmail"
                      >
                        EMAIL
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="sightedCatEmail"
                        type="text"
                        name="sightedCatEmail"
                        value={formFields.sightedCatEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="sightedCatPhone"
                      >
                        PHONE
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="sightedCatPhone"
                        type="text"
                        name="sightedCatPhone"
                        value={formFields.sightedCatPhone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <label
                        className="cat-sightings-form-label"
                        htmlFor="sightedImgUrl"
                      >
                        PHOTO
                      </label>
                      <input
                        className="cat-sightings-form-input"
                        id="file"
                        type="file"
                        name="file"
                        required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="cat-sightings-form__section">
                      <h3 className="cat-sightings-form-label">PRIVACY</h3>
                      <h4 className="cat-sightings-form-privacy">
                        Completing a listing will make your contact details
                        visible. For more privacy, you only need to list the
                        street or suburb the animal was seen - not an exact
                        address.
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="cat-sightings-form__btn">
                  <button
                    className="submit cat-sightings-form-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="cat-sightings__cards">
              {catsighting.map((sighting: SightedCat) => (
                <div
                  key={sighting.sightedCatId}
                  className="cat-sightings-card"
                >
                  <div className="cat-sightings-card__top">
                    <div className="cat-sightings-card__img">
                      <img
                        src={'/' + sighting.sightedImageUrl}
                        alt={sighting.description}
                        className="cat-sightings-card-img"
                      />
                    </div>
                    <div className="cat-sightings-card__info">
                      <div className="cat-sightings-card-section">
                        <h3 className="cat-sightings-card-title">Sighted:</h3>
                        <p className="cat-sightings-card-info">
                          {sighting.dateSeen.slice(0,10)}
                        </p>
                      </div>
                      <div className="cat-sightings-card-section">
                        <h3 className="cat-sightings-card-title">Location:</h3>
                        <p className="cat-sightings-card-info">
                          {sighting.stringLocation}
                        </p>
                      </div>
                      <div className="cat-sightings-card-section">
                        <h3 className="cat-sightings-card-title">Colour</h3>
                        <p className="cat-sightings-card-info">
                          {sighting.color}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="cat-sightings-card__bottom">
                    <h3 className="cat-sightings-card-title">Description</h3>
                    <p className="cat-sightings-card-info">
                      {sighting.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
