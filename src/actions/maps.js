const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export const getMapsUrl = (activities) => {
  var mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x400&maptype=roadmap&key=${GOOGLE_MAPS_KEY}`
  
  if (activities.length > 0 && activities[0]['start_latlng'] != null) {
    const lat = activities[0]['start_latlng'][0]
    const lng = activities[0]['start_latlng'][1]
    mapsUrl = `${mapsUrl}&zoom=12&center=${lat},${lng}`
  }
  
  activities.slice(0, 10).map(activity => {
    if (activity['map'] != null && activity['map']['summary_polyline'] != null) {
      var polyline = activity['map']['summary_polyline']
      polyline.replace(/\\\\/g, '\\')
      mapsUrl = `${mapsUrl}&path=enc:${polyline}`
    }
  })

  return mapsUrl
}