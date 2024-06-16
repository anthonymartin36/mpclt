import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addMissingCatApi } from '../apis/api-cats'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'

const emptyCat = {
  catName: '',
  location: '',
  dateLost: '',
  color: '',
  breed: '',
  description: '',
  missingCatPhone: '',
  missingCatEmail: '',
  microchip: '',
  microChipNumber: '',
  missingImageUrl: '',
  catMissing: true,
}

export default function AddMissingCat() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formFields, setFormFields] = useState(emptyCat)
  const formData = new FormData()
  const [files, setFiles] = useState('')
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([])

  const addCatMutuation = useMutation({
    mutationFn: addMissingCatApi,
    onSuccess: async (data) => {
      const { catId } = data
      queryClient.invalidateQueries(['NewMissingCat'])
      setFormFields(emptyCat)
      navigate(`/missingcats/singlecat/${catId}`)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const catMissingAsString = formFields.catMissing.toString()
    formData.append('catName', formFields.catName)
    formData.append('location', formFields.location)
    formData.append('dateLost', formFields.dateLost)
    formData.append('color', formFields.color)
    formData.append('breed', formFields.breed)
    formData.append('description', formFields.description)
    formData.append('missingCatPhone', formFields.missingCatPhone)
    formData.append('missingCatEmail', formFields.missingCatEmail)
    formData.append('microchip', formFields.microchip)
    formData.append('microChipNumber', formFields.microChipNumber)
    formData.append('catMissing', catMissingAsString)
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }

    try {
      addCatMutuation.mutate(formData)
    } catch (error: any) {
      console.log('Error adding cat')
    }
  }

  const handleInputChange = async (e: any) => {
    if (e.target.name === 'microchip') {
      setFormFields({
        ...formFields,
        microchip: e.target.value,
      })
    } else if (e.target.name === 'file') {
      setFiles([...files, ...e.target.files])
      const newFileNames = Array.from(e.target.files).map(
        (file: File) => file.name,
      )
      setUploadedFileNames([...uploadedFileNames, ...newFileNames])
    } else {
      setFormFields({
        ...formFields,
        [e.target.name]: e.target.value,
      })
    }
  }
  const backgroundColour = 'none'
  const itemColour = '#030303'
  const borderColour = '#030303'
  const navLogo = 'client/images/MP-Logo-Black.svg'

  return (
    <>
      <Nav
        backgroundColour={backgroundColour}
        itemColour={itemColour}
        borderColour={borderColour}
        navLogoSrc={navLogo}
      />
      <section className="add-m-cat">
        <div className="add-m-cat__header">
          <h1 className="add-m-cat-heading">Missing your Kitty?</h1>
        </div>
        <div className="add-m-cat__form">
          <h2 className="add-m-cat-form-heading">
            Fill out this form to get them listed!
          </h2>

          {/* Form Starts */}
          <form
            className="add-m-cat-form"
            action="/addcat"
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <div className="add-m-cat-form__section">
              <div className="add-m-cat-form-section">
                <label className="add-m-cat-form-label" htmlFor="catName">
                  NAME
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="catName"
                  type="text"
                  name="catName"
                  value={formFields.catName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-m-cat-form-section">
                <label className="add-m-cat-form-label" htmlFor="location">
                  LOCATION
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="location"
                  type="text"
                  name="location"
                  value={formFields.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-m-cat-form-section">
                <label className="add-m-cat-form-label" htmlFor="dateLost">
                  DATE LOST
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="dateLost"
                  type="date"
                  name="dateLost"
                  value={formFields.dateLost}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-m-cat-form-section">
                <label className="add-m-cat-form-label" htmlFor="color">
                  COLOR
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="color"
                  type="text"
                  name="color"
                  value={formFields.color}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-m-cat-form-section">
                <label className="add-m-cat-form-label" htmlFor="breed">
                  BREED
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="breed"
                  type="text"
                  name="breed"
                  value={formFields.breed}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-m-cat-form-section">
                <label
                  className="add-m-cat-form-label"
                  htmlFor="missingCatEmail"
                >
                  EMAIL
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="missingCatEmail"
                  type="text"
                  name="missingCatEmail"
                  value={formFields.missingCatEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="add-m-cat-form-div"></div>
            <div className="add-m-cat-form__section">
              <div className="add-m-cat-form-section">
                <label
                  className="add-m-cat-form-label"
                  htmlFor="missingCatPhone"
                >
                  PHONE
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="missingCatPhone"
                  type="text"
                  name="missingCatPhone"
                  value={formFields.missingCatPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-m-cat-form-section">
                <label className="add-m-cat-form-label" htmlFor="microchip">
                  MICROCHIPPED?
                </label>
                <select
                  className="add-m-cat-form-input"
                  id="microchip"
                  name="microchip"
                  value={formFields.microchip}
                  onChange={handleInputChange}
                >
                  <option value="yes">NO</option>
                  <option value="no">YES</option>
                </select>
              </div>
              <div className="add-m-cat-form-section">
                <label
                  className="add-m-cat-form-label"
                  htmlFor="microChipNumber"
                >
                  MICROCHIP NO.
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="microChipNumber"
                  type="text"
                  name="microChipNumber"
                  value={formFields.microChipNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="add-m-cat-form-section">
                <label className="add-m-cat-form-label" htmlFor="description">
                  DESCRIPTION
                </label>
                <textarea
                  className="add-m-cat-form-input"
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
            <div className="add-m-cat-form-div"></div>
            <div className="add-m-cat-form__section">
              <div className="add-m-cat-form-section">
                <label
                  className="add-m-cat-form-label"
                  htmlFor="missingImageUrl"
                >
                  PHOTO
                </label>
                <input
                  className="add-m-cat-form-input"
                  id="file"
                  type="file"
                  name="file"
                  required
                  onChange={handleInputChange}
                  multiple
                />
                {uploadedFileNames.map((fileName, index) => (
                  <p key={index}>
                    File {index + 1}: {fileName}
                  </p>
                ))}
              </div>
              <div className="add-m-cat-form-section">
                <h3 className="add-m-cat-form-label">Privacy</h3>
                <p className="add-m-cat-form-privacy">
                  Completing a listing will make your contact details visible.
                  For more privacy, you only need to list the street or suburb
                  the animal was seen - not an exact address.
                </p>
              </div>
              <div className="add-m-cat-form-section">
                <div className="add-m-cat-form__btn">
                  <button
                    type="submit"
                    disabled={files.length === 0}
                    className="add-cat add-m-cat-form-btn"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
