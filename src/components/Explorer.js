import React, { useState, useEffect } from 'react';
import { exchangeAccessToken } from '../actions/authorization';
import { getActivities } from '../actions/activities';
import { getMapsUrl } from '../actions/maps';

const Explorer = (props) => {

  const [token, setToken] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // get params from url
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const accessCode = urlParams.get('code')

    if (accessCode == null) {
      window.location.href = '/'
    }

    exchangeAccessToken(accessCode, setToken)
  }, [])

  useEffect(() => {
    if (token != null) {
      getActivities(token, setActivities)
    }
  }, [token])

  return (
    <div>
      Explorer
      <div>
        <img src={getMapsUrl(activities)} />
      </div>
      <div>
        {activities.filter(activity => activity['type'] == 'Run').map(activity => {
          return (
            <div>
              {activity['name']} - {parseFloat(activity['distance']/1000.0).toFixed(2)} km - {activity['start_date']}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Explorer