//api-cats.ts

import request from 'superagent'
import { MissingCat, NewSightedCat, SightedCat } from '../../models/cats'
const rootUrl = import.meta.env.VITE_API_URL //'http://localhost:3000/api/v1' 


// ----- MISSING CATS ----- //

// GET all missing cats (/api/v1/missingcats)

export async function getAllMissingCatsApi(): Promise<MissingCat[]> {
  try {
    //console.log("URL Get Cats", `${rootUrl}/missingcats`)
    const response = await request.get(`${rootUrl}/missingcats`)
    return response.body
  } catch (error) {
    throw console.error('Error fetching missing cats', error)
  }
}

// GET one missing cat (/api/v1/missingcats/singlecat/:catId)

export async function getOneMissingCatApi(catId: number): Promise<MissingCat> {
  try {
    const response = await request.get(
      `${rootUrl}/missingcats/singlecat/${catId}`,
    )
    return response.body
  } catch (error) {
    console.error(`Error fetching cat with id ${catId}: `, error)
    throw new Error(`Failed to fetch cat with id ${catId}`)
  }
}

// ADD a missing cat (/api/v1/missingcats/addcat)

export async function addMissingCatApi(formData: MissingCat) {
  try {
    const response = await request
      .post(`${rootUrl}/missingcats/addcat`)
      .send(formData)
    return response.body
  } catch (error) {
    throw console.error(`Error adding missing cat `, error)
  }
}

// DELETE a missing cat (/api/v1/missingcat/:id)

export async function deleteMissingCatApi(missingCatId: number) {
  try {
    const response = await request.delete(
      `${rootUrl}/missingcats/${missingCatId}`,
    )
    return response.body
  } catch (error) {
    console.error(`Error deleting cat, `, error)
  }
}

// ----- CAT SIGHTINGS ----- //

// GET sightings for a particular cat (/api/v1/sightedcats/singlecat/sighting/:catIdMc)

export async function getCatSightingsApi(catIdMc: number): Promise<SightedCat> {
  try {
    const response = await request.get(
      `${rootUrl}/sightedcats/singlecat/sighting/${catIdMc}`,
    )
    return response.body
  } catch (error) {
    throw console.error('Failed to fetch cat sightings', error) 
  }
}

// ADD a cat sighting for a particular cat (/api/v1/sightedcats/:catIdMc/add)

export async function addCatSightingApi(
  sightedCat: NewSightedCat,
  catIdMc: number,
) {
  try {
    const response = await request
      .post(`${rootUrl}/sightedcats/${catIdMc}/add`)
      .send(sightedCat)
    return response.body
  } catch (error) {
    console.error(`Error adding cat sighting`, error)
  }
}

//
export async function FoundCatsApi(catId: number, catMissing: boolean) {
  try {
    // Make a request to your server to update the cat status
    const response = await request
      .put(`${rootUrl}/missingcats/singlecat/${catId}`)
      .send({ catMissing })

    if (response.status === 200) {
      console.log('Cat marked as found successfully!')
      // Redirect the user to the /foundcats route
      window.location.href = `/foundcats`
    } else {
      // Handle the case where the API request was successful but the cat wasn't marked as found
      console.error('Cat could not be marked as found:', response.body)
      throw new Error('Failed to mark cat as found')
    }
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error marking cat as found:', error)
    throw new Error('Failed to mark cat as found')
  }
}
