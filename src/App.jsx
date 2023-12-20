import { useState, useEffect } from 'react'
import axios from "axios"

import './App.css'

function App() {
  const [flavors, setFlavors] = useState([])

  useEffect(() => {
    const fetchflavors = async () => {
      const {data} = await axios.get('http://localhost:3000/api/flavors')
     
      setFlavors(data)
    }

    fetchflavors()
  }, [])

  const deleteflavor = async (flavor_) => {
    try {
      await axios.delete(`http://localhost:3000/api/flavors/${flavor_.id}`)
 
      const newflavors = flavors.filter((flavor) => {
        return flavor.id !== flavor_.id
      })
      setFlavors(newflavors)
      

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Ice Cream Shop</h1>
      <h2>Flavors - {flavors.length}:</h2>
      {
        flavors.map((flavor) => {
          return (
            <div key={flavor.id}>{flavor.name}
            <button onClick={() => {deleteflavor(flavor)}}>X</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
