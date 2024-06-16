//routes.tsx

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import MissingCatList from './components/MissingCatList'
import SingleCat from './components/SingleCat'
import AddMissingCat from './components/AddMissingCat'
import AddCatSightings from './components/AddCatSightings'
import FoundCatList from './components/FoundCatList'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="missingcats" element={<MissingCatList />} />
        <Route path="missingcats/singlecat/:catId" element={<SingleCat />} />
        <Route path="addcat" element={<AddMissingCat />} />
        <Route path="sightings/:catIdMc" element={<AddCatSightings />} />
        <Route path="foundcats" element={<FoundCatList />} />
      </Route>
    </>,
  ),
)

export default router
