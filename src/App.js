import { object } from "prop-types";
import React, { useEffect,useState} from "react";
import axios from 'axios';
import uuid from 'react-uuid';
import { ErrorApp } from "./ErrorComponent";
// import { TableApp } from "./tableComponent";

export default function RestApp(){
  const regions=["Americas","Africa","Oceania","Europe","Asia","Antarctic"]
  const [data,setData]=useState([])
  const [lang,setLang]=useState([])
  const [order,setOrder]=useState('')
  const [poporder,setPopOrder]=useState('')
  const [fetchData,setFetchData]=useState("")
 
  const nocountries=data.status||data.message
 
  useEffect(() => {
    if(fetchData!==""){
      LoadRegions(fetchData)
    }
    else{
      Complete_Data()
    }
  },[fetchData])

const LoadRegions=async()=>{
  const region_data=await fetch(fetchData)
  const result=await region_data.json()
  setData(result)
}
  const Complete_Data=async () =>{
    const response=await fetch('https://restcountries.com/v3.1/all')
    const result=await response.json()
    setData(result)
  }
  
  const selectVal=(e)=>{
    switch(e.target.value){
      case "country-asc":
        sortData(e.target.value)
        break;
        case "country-dsc":
        sortData(e.target.value)
        break;
      case "pop-asc":
        sortData(e.target.value)
        break;
        case "pop-dsc":
        sortData(e.target.value)
        break;

    }
  }
const sortData=(p)=>{
  if(p==="country-asc"){
    const sorting=[...data].sort((a,b)=>
    a.name.common.localeCompare(b.name.common))
    setData(sorting)
    setOrder('DSC')
  }
  if(p==="country-asc"||p==="counrty-dsc"){
    setPopOrder('')
  }
  if(p==="pop-asc"||p==="pop-dsc"){
    setOrder('')
  }
  if(p==='country-dsc'){
    const sorting=[...data].sort((a,b)=>
    b.name.common.localeCompare(a.name.common))
    setData(sorting)
    setOrder ('ASC')
  } 
  if(p==="pop-asc"){
    const sorting=[...data].sort((a,b) =>
    {
      if (a.population>b.population)return 1
      if(a.population<b.population) return -1
      return 0;
    })
    setData(sorting)
    setPopOrder('DSC')
  }
  if(p==='pop-dsc'){
    const sorting=[...data].sort((a,b) =>
    {
      if (a.population<b.population)return 1
      if(a.population>b.population) return -1
      return 0;
    })
    setData(sorting)
    setPopOrder('ASC')
  }
}

function LoadData(e){
  switch(e.target.value){
    case "all":
      Complete_Data()
      break;
      default:
        setFetchData(`https://restcountries.com/v3.1/region/${e.target.value}`)   
  }
  
}
function searchCountries(e){
  console.log(e.target.value)
  if(e.target.value!==""){
    try{
      fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
      .then(function(res){
        res.json().then(function(result){
          setData(result)
        })
      })
    }
    catch(err){
      console.log(err)
    
   } 
  }
  else{
    Complete_Data()
  }
  
}
  return(
    <>
    <div className="container">
    <h1 style={{textAlign:"center"}}>Country API Data</h1>
    <div className="drop_downs d-flex justify-content-between">
      <div className="div_one">
        <div className="input-group mb-3">
    <input type="text" className="form-control w-25" onChange={searchCountries} placeholder="Search"/>
    <button type="button" className="btn btn-primary" >Search</button>
      </div>

      </div>
    
      <div className="div_two">

      <select defaultValue={'DEFAULT'} onChange={selectVal} className="form-select">
      <option value="DEFAULT" disabled>Sort</option>
       <option value="country-asc">Country-Asc</option>
       <option value="country-dsc">Country-Dsc</option>
       <option value="pop-asc">Population-Asc</option>
       <option value="pop-dsc">Population-Dsc</option>
     </select>
      </div>
     <div className="drop_three">
      <select defaultValue={'DEFAULT'} onChange={LoadData} className="form-select">
      <option disabled value="DEFAULT" >Select By Region</option>
        <option value="all">All</option>
        {regions.map(animal => (
        <option value={animal} key={animal}>{animal}</option>
      ))}
      </select>
     </div>
    </div>
    {!nocountries?(  <table className="table  table-striped table-hover mt-3">
      <thead className="table-primary">
        <tr>
        <th ><span className="fa fa-globe me-3"></span>Name{order==='DSC' ?<span className='fa fa-arrow-down ms-4'></span>:order==='ASC'?<span  className="fa fa-arrow-up ms-4"></span>:<span  className="fa  ms-4"></span>}</th>
        <th>Capital</th>
        <th>Flag</th>
        <th>Population{poporder==='DSC' ?<span className='fa fa-arrow-down ms-2'></span>:poporder==='ASC'?<span  className="fa fa-arrow-up ms-2"></span>:<span  className="fa  ms-4"></span>}</th>
        <th>Languages</th>

        </tr>
        
      </thead>
      <tbody className="table-dark">
        {data.map((res_data,index)=>
            <>
            <tr key={index}>
              <td >{res_data.name['common']}</td>
              <td>{res_data.capital}</td>
              <td><img src={res_data.flags.png} alt="loading" /></td>
              <td>{res_data.population}</td>
              <td>
                <ul>
              { res_data.languages && Object.keys(res_data.languages)?.map(
      (answer, index) => (
        <>
        <li key={index}>{res_data.languages[answer]}</li>
        </>
          
  
      )
     )}
     </ul>
              </td>
              
            </tr>
            </>
          )}
      </tbody>

    </table>):
    <center><ErrorApp/></center>
    }
    </div>
    
    </>
  )
}