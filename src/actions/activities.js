import axios from 'axios'

const API_URL = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_ACTIVITIES_PATH

export const getActivities = (accessToken, onSuccess) => {
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  axios.get(API_URL, config)
  .then(res => onSuccess(res.data))
  .catch(err => console.log('error!', err))
}