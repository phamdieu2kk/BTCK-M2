import React, { createContext, useState } from "react"

export const CarsContext = createContext()

export const CarsProvider = ({ children }) => {
  const [query, setQuery] = useState("")

  const addToQuery = (value) => {
    console.log("Search term:", value)
    setQuery(value)
  }

  return (
    <CarsContext.Provider value={{ query, addToQuery }}>
      {children}
    </CarsContext.Provider>
  )
}
