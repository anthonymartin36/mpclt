export const fetchGoogleMapsAPIKey = async () => {
  try {
    const response = await fetch('/api/getGoogleMapsKey')
    const data = await response.json()
    return data.apiKey
  } catch (error) {
    console.error('Error fetching Google Maps API key:', error)
    throw error
  }
}
