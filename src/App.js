import { object } from "prop-types";
import React, { useEffect,useState} from "react";
import axios from 'axios';

export default function RestApp(){
  const regions=["Americas","Africa","Oceania","Europe","Asia","Antarctic"]
  const [data,updateData]=useState([])
  const [lang,updateLang]=useState([])
  const [order,updateOrder]=useState('ASC')
  const [poporder,updatePopOrder]=useState('ASC')
  const [fetchData,UpdateFetchData]=useState('https://restcountries.com/v3.1/all')
 
  useEffect(() => {
    const contryData = axios.get(fetchData).then((res) =>{
      // console.log(res.data)
      updateData(res.data);
    })
  },[fetchData])
  
  const selectVal=(e)=>{
    switch(e.target.value){
      case "country":
        sortData()
        break;
      case "pop":
        sortPop()
        break;
    }

  }
const sortData=()=>{
  if(order==='ASC'){
    const sorting=[...data].sort((a,b)=>
    a.name.common.localeCompare(b.name.common))
    updateData(sorting)
    updateOrder('DSC')
  }
  
  if(order==='DSC'){
    const sorting=[...data].sort((a,b)=>
    b.name.common.localeCompare(a.name.common))
    updateData(sorting)
    updateOrder ('ASC')
  } 
}
const sortPop=()=>{
  if(poporder==='ASC'){
    const sorting=[...data].sort((a,b) =>
    {
      if (a.population>b.population)return 1
      if(a.population<b.population) return -1
      return 0;
    })
    updateData(sorting)
    updatePopOrder('DSC')
  }
  if(poporder==='DSC'){
    const sorting=[...data].sort((a,b) =>
    {
      if (a.population<b.population)return 1
      if(a.population>b.population) return -1
      return 0;
    })
    updateData(sorting)
    updatePopOrder('ASC')
  }
}
function LoadData(e){
  switch(e.target.value){
    case "all":
      UpdateFetchData('https://restcountries.com/v3.1/all')
      break;
      default:
        UpdateFetchData(`https://restcountries.com/v3.1/region/${e.target.value}`)
      
  }
  
}
  return(
    <>
    <div className="container">
    <h1 style={{textAlign:"center"}}>Country API Data</h1>
    <div className="drop_downs d-flex justify-content-between">
      <div className="div_one">

      <select onChange={selectVal}>
       <option value="country">Country- HERE</option>
       <option value="pop">Population</option>
     </select>
      </div>
     <div className="drop_two">
      <select onChange={LoadData}>
      <option disabled selected>Select By Region</option>
        <option value="all">All</option>
        {regions.map(animal => (
        <option value={animal} selected>{animal}</option>
      ))}
      </select>
     </div>
    </div>
    <table className="table">
      <thead>
        <tr>
        <th onClick={sortData}>Name{order==='DSC' ?<span  className='fa fa-arrow-down'></span>:<span  className="fa fa-arrow-up"></span>}</th>
        <th>Capital</th>
        <th>Flag</th>
        <th onClick={sortPop}>Population</th>
        <th>Languages</th>
        {/* <th>Region</th> */}
        </tr>
        
      </thead>
      <tbody>
        {
          data.map((res_data)=>
            <>
            <tr>
              <td >{res_data.name['common']}</td>
              <td>{res_data.capital}</td>
              <td><img src={res_data.flags.png} alt="loading" /></td>
              <td>{res_data.population}</td>
              <td>
                <ul>
              { res_data.languages && Object.keys(res_data.languages)?.map(
      (answer, index) => (
          <li key={index}>{res_data.languages[answer]}</li>
      )
     )}
     </ul>
              </td>
              
          
            </tr>
            </>
          )
        }
      </tbody>

    </table>
    </div>
    
    </>
  )
}