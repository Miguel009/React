import './App.css';
import Map from './components/map'
import {useState, useEffect} from 'react'
import Header from './components/header'
import Loading from './components/loading'
function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect( ()=>{
    const fecthEvents = async()=>{
      setLoading(true)
      const res  = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      const {events} = await res.json()
      setEventData(events)
      setLoading(false)
    }
    fecthEvents();
  }, [])
  return (
    <>
        <Header/>
    <div>
      {
        !loading?
        <Map eventData={eventData}/>
        :
        <Loading></Loading>
      }
    </div>
    </>
  );
}

export default App;
