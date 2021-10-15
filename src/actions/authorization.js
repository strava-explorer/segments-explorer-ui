import axios from 'axios'

const STRAVA_URL = process.env.REACT_APP_STRAVA_AUTH_URL
const REDIRECT_URL = process.env.REACT_APP_UI_BASE_URL + process.env.REACT_APP_UI_REDIRECT_PATH
const API_URL = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_AUTHORIZE_PATH
const CLIENT_ID = process.env.REACT_APP_STRAVA_CLIENT_ID

export const authorize = () => {

  const requestUrl = new URL(`${STRAVA_URL}/authorize`);

  requestUrl.searchParams.append("client_id", CLIENT_ID);
  requestUrl.searchParams.append("redirect_uri", REDIRECT_URL);
  requestUrl.searchParams.append("response_type", "code");
  requestUrl.searchParams.append("scope", "activity:read,read_all");

  window.location = requestUrl.href
}

export const exchangeAccessToken = (accessToken, onSuccess) => {

  const url = `${API_URL}?accessToken=${accessToken}`;

  axios.post(url)
  .then(res => {
    onSuccess(res.data['authToken'])
  })
  .catch(err => {
    window.location.href = '/'
  })
}