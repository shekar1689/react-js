import React, { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import './details.css';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
export function DetailsApp(){
    const [data,setData]=useState([])
    console.log(data)
    const params=useParams();
     useEffect(()=>details,[])

    const details= async ()=>{
    const response=await fetch(`
    https://restcountries.com/v3.1/name/${params.name}?fullText=true`);
    const result=await response.json()
   setData(result)
//    console.log("result",result)
//    console.log(data)
   }
    
    return(
        <>
        <div className="container">
            <div className="row">
            {
                            data.map((res)=>
                            <>
                            <div className="img_dis mt-5">
                            <img src={res.flags.png}/>
                            <div className="img-layer">
                            </div>
                            <div className="text-layer">
                            <div>
                            <h1>Country Name:{res.name['common']}</h1>
                            <div className="details-bg">
                            <h3>Region:{res.region}</h3>
                            <h3>SubRegion:{res.subregion}</h3>
                            <h3>Capital:{res.capital}</h3>
                            </div>
                            
                            <button className="btn btn-primary btn-lg w-100" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                     Languages
                           </button>
                           <div className="collapse.show multi-collapse" id="collapseExample">
                      <div className="card card-body">
                      <ul>
                                {
                                    res.languages &&Object.keys(res.languages)?.map((lan)=>
                                        <>
                                        <li className="list-unstyled">{res.languages[lan]}</li>
                                        </>
                                      )
                                }
                            </ul>
                      </div>
                         </div>
                
                            </div>
                            </div>
                           </div>
                           <div className="offset-md-4 col-md-4">
                           <div className="map">
                           <h3 className="text-center"><i className="fa-solid fa-location-dot me-3"></i>Location</h3>
                            <center>
                           <LoadScript
             googleMapsApiKey={res.maps.googlemaps}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        
        <></>
      </GoogleMap>
    </LoadScript>
    </center>
                           </div>
                           </div>
                </>)
                        }
                   
                
            </div>
       
        </div>
        </>
    )
}