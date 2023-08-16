import React from 'react'
import Spinner from "react-bootstrap/Spinner"
const Spiner = () => {
  return (
    <div className="text-center py-5">
        <p>En cours de chargement ...</p>
        <Spinner animation="border"/>
    </div>
  )
}

export default Spiner