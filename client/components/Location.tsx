import { useState, useEffect } from "react"
import { useJsApiLoader } from "@react-google-maps/api"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import '../styles/Location.css'

type addressType = {address: string, lat: number, lng: number}
interface LocationProps {
  changeAddress: (locationField: addressType) => void
}
const libraries =  ["places"] as any[]

export default function Location({ changeAddress }: LocationProps) {
  //const libraries = ['places'] as any[]
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libraries, 
  })
  const [selected, setSelected] = useState({address: '', lat: 0, lng: 0})

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  function fixAddress (address: addressType){
    setSelected(address)
    return selected
  }
  useEffect(() => {
    changeAddress(selected) // Assuming this is the correct way to update the address in your parent component
  }, [selected])

  const handleSelect = async (address : string) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    fixAddress({address, lat: lat, lng: lng}) //{address, lat: lat, lng: lng}
  }
  if (!isLoaded) return <div>Loading...</div>
  if (loadError) return <div>Error...</div>
  return (
    <>
      <div className="places-container">
      <Combobox onSelect={handleSelect}>
      <ComboboxInput 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="cat-sightings-form-input"
        placeholder="Search an address" 
      />
      <ComboboxPopover>
        <ComboboxList className="pac-item">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
      </div>
    </>
  )
}
