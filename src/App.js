import { object } from "prop-types";
import React, { useEffect,useState} from "react";

export default function RestApp(){
  const [data,updateData]=useState([])
  const [lang,updateLang]=useState([])
  const [order,updateOrder]=useState('ASC')
  const [poporder,updatePopOrder]=useState('ASC')
  const [fetchData,UpdateFetchData]=useState('https://restcountries.com/v3.1/all')
 
  useEffect(()=>{
    fetch(fetchData)
    .then(function(res){
      res.json().then(function(result){
        updateData(result)
        console.log(result)
      })
    })
  },[fetchData])
  // console.log(lang)
  
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
    case "europe":
      alert("filtering")
      UpdateFetchData('https://restcountries.com/v3.1/region/europe')
      break;
    
  }
  
}
  return(
    <>
    <div className="container">
    <h1 style={{textAlign:"center"}}>Country API Data</h1>
    <div className="drop_downs d-flex justify-content-between">
      <div className="div_one">

      <select onChange={selectVal}>
       <option value="country">Country</option>
       <option value="pop">Population</option>
     </select>
      </div>
     <div className="drop_two">
      <select onChange={LoadData}>
        <option value="all">All</option>
        {
          data.map((drop_data)=>
          <>
          <option value={drop_data.region} key={drop_data.region}>{drop_data.region}</option>
          </>)
        }
      </select>
     </div>
    </div>
    <table className="table">
      <thead>
        <tr>
        <th onClick={sortData}>Name</th>
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