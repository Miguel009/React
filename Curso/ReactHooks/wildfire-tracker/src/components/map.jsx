import {useState} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './locationMarker'
import LocationInfo from './locationInfo'
function Map({eventData, center, zoom}) {
    const [locationInfo, SetLocationInfo] = useState(null)
    const markers = eventData.map(ev=>{
        if(ev.categories[0].id===8)
        {
            return <LocationMarker onClick={()=>SetLocationInfo({id: ev.id, title: ev.title})} lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]}></LocationMarker>
        }
        return null
    })
  return (
    <div className="map">
      <GoogleMapReact
      bootstrapURLKeys={{key: 'key'}}
      defaultCenter={center}
      defaultZoom={zoom}
      >
        {
            markers
        }
      </GoogleMapReact>
      {
          locationInfo && <LocationInfo info={locationInfo}/>
      }
    </div>
  );
}
Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom: 6
}

export default Map;
