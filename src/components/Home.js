import React from 'react'
import { authorize } from '../actions/authorization'

const Home = () => {

  const submit = () => {
    authorize()
  }

  return (
    <div>
      <button onClick={() => submit()}>
        Integrate with Strava
      </button>
    </div>
  )
}

export default Home