import { object } from "prop-types";
import React, { useEffect,useState} from "react";
import axios from 'axios';
import * as yup from "yup";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import { ErrorApp } from "./ErrorComponent";
import './App.css'
import ReactPaginate from 'react-paginate';
import { DetailsApp } from "./DetailsComponent";

import {Store} from './userLogin'
import './login.css'
import { useFormik } from "formik";
import { createContext } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';


export default function RestApp(){
  const regions=["Americas","Africa","Oceania","Europe","Asia","Antarctic"]
  const [userdetails,setuserdetails]=useState({email:"sai@gmail.com",pwd:1234567890})
  const [formdetails,setformdetails]=useState({email:"",pwd:""})
  const [data,setData]=useState([])
  const [totalData,setTotalData]=useState([])
  const [lang,setLang]=useState([])
  const [order,setOrder]=useState('')
  const [poporder,setPopOrder]=useState('')
  const [fetchData,setFetchData]=useState("")
  const [pagecount,setPageCount]=useState(10)
  const [pageData,setPageData]=useState([])
  const [totalpages,setTotalPages]=useState(25)
  const [currentPage,setcurrentPage]=useState(1);
  const [formError,setfromError]=useState('')
  const nocountries=data.status||data.message
  const [registervalue,setRegisterVlaue]=useState(false)

  const itemsperpage = Math.ceil(totalData.length / totalpages);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsperpage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsperpage) % totalData.length;
    console.log((event.selected * itemsperpage))
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setData(totalData.slice(itemOffset, endOffset));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  function validate(values){
    const errors = {email:"",password:"",conformpassword:""};
    if (values.email === userdetails.email) {
      errors.email = "Email Already Exits";
    }
    if (values.email != userdetails.email) {
      errors.email = "";
    }
    
    if(values.password!=values.conformPassword){
      errors.conformpassword="Password must match"
    }
    if(values.password==values.conformPassword){
      errors.conformpassword=""
    }
    return errors;
  };
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
    const filter_data=result
    setData(filter_data.slice(0,pagecount))
    setTotalData(result)
  }
  
  function pagefun(e){
    setData(totalData.slice(e.target.name*10-10,e.target.name*10))
    setPageData(e.target.name)
    setcurrentPage(e.target.name)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
function prevfun(){
  var prev_data=pageData-1
 setData(totalData.slice(prev_data*10-10,pageData*10-10))
}
function nxtfun(){
  var prev_data=pageData
  alert(pageData)
 setData(totalData.slice((prev_data*10),(prev_data*10)+10))
 setPageData(parseInt(pageData)+1)

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
// function fieldvalidates(){
//   const obj={email:"",pwd:""}
//   if(userdetails.email!=formdetails.email){
//     obj.email="invalid email"
//   }
//   return obj
// }
const formk=useFormik({
  initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur:true,
    validateOnChange:true,
    validationSchema:yup.object().shape({
      email: yup.string().required('Required field').test('match', 'Passwords do not match', function (value) {
        return this.parent.email ==value;
      }),
      password: yup.string().required('Required field').test('age-match', 'Age must match', function (value) {
        return this.parent.password == value
      }),}),
    onSubmit: (values) => {
      alert(JSON.parse(JSON.stringify(values.email)))
      setformdetails({email:JSON.parse(JSON.stringify(values.email)),pwd:parseInt(JSON.parse(JSON.stringify(values.password)))})
      if(userdetails.email==formdetails.email&&userdetails.pwd==formdetails.pwd){
        alert("Login Success")
      }
      else if(userdetails.email!=formdetails.email){
        setfromError("Invalid Email or password")
      }
      else{
        setfromError("Invalid Email or password")
      }
      // fieldvalidates()
    },

    
})
const formik = useFormik({
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  onSubmit: values => {
    alert(values)
    setformdetails({email:JSON.parse(JSON.stringify(values.email)),pwd:parseInt(JSON.parse(JSON.stringify(values.password)))})
    setuserdetails({email:JSON.parse(JSON.stringify(values.email)),pwd:parseInt(JSON.parse(JSON.stringify(values.password)))})

  },
  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  },
});
  return(
    <>
    <div className="container">
    <h1 style={{textAlign:"center"}}>Country API Data</h1>
    
    {!nocountries?( <> <BrowserRouter>
    <Routes>
      <Route path='/contact/:name' element={<DetailsApp/>}></Route>
      <Route path='/' element={userdetails.email===formdetails.email&&userdetails.pwd===formdetails.pwd?
      <>
      <div className="drop_downs d-flex justify-content-between">
      <div className="div_one">
        <div className="input-group mb-3">
    <input type="text" className="form-control w-25" onChange={searchCountries}  placeholder="Search"/>
    <button type="button" className="btn btn-primary" ><i className="fa-solid fa-magnifying-glass me-3"></i>Search</button>
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
      <span className="p-3">Total Records:{totalData.length}</span>
      <select defaultValue={'DEFAULT'} onChange={LoadData} className="form-select">
      <option disabled value="DEFAULT" >Select By Region</option>
        <option value="all">All</option>
        {regions.map(animal => (
        <option value={animal} key={animal}>{animal}</option>
      ))}
      </select>
     </div>
    </div>
        <table className="table  table-striped table-hover mt-3">
      <thead className="table-primary">
        <tr>
        <th ><span className="fa fa-globe me-3"></span>Name{order==='DSC' ?<span className='fa fa-arrow-down ms-4'></span>:order==='ASC'?<span  className="fa fa-arrow-up ms-4"></span>:<span  className="fa  ms-4"></span>}</th>
        <th>Capital</th>
        <th><i className="fa-solid fa-flag me-3"></i>Flag</th>
        <th><i className="fa-solid fa-people-group me-3"></i>Population{poporder==='DSC' ?<span className='fa fa-arrow-down ms-2'></span>:poporder==='ASC'?<span  className="fa fa-arrow-up ms-2"></span>:<span  className="fa  ms-4"></span>}</th>
        <th>Languages</th>

        </tr>
        
      </thead>
      <tbody className="table-dark">
        {data.map((res_data,index)=>
            <>
            <tr key={index} >
              <td><Link to={`/contact/${res_data.name['common']}`}>{res_data.name['common']}</Link></td>
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

    </table>
    <center>
   <ReactPaginate
        breakLabel="....."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={25}
        previousLabel="<Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagin_ation"
        activeLinkClassName="active-link"
      />
     </center>
    </>:registervalue?<><div className="container">
      <div className="row">
        <div className="offset-md-4 col-md-4">
          <div className="register_form">
          <h1>User Registartion</h1>
          <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" className="form-control" {...formik.getFieldProps('email')} />

      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">Password:</label>
      <input type="password" id="password"  className="form-control" {...formik.getFieldProps('password')} />

      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" className="form-control" {...formik.getFieldProps('confirmPassword')} />

      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}

      <button type="submit" className="btn btn-primary mt-3">Register & Login</button>
      <button type="button" className="btn btn-primary mt-3 ms-3" onClick={()=>setRegisterVlaue(false)}>Back to Login</button>
    </form>
          </div>
        </div>
        </div></div></>:<><div className="container">
            <div className="row">
                <div className="offset-md-4 col-md-4">
                    <div className="form-data">
                        <h3 className="text-center">Login Here..</h3>
                    <form onSubmit={formk.handleSubmit}>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control"  name="email" onChange={formk.handleChange} value={formk.values.firstName} placeholder="Enter email"/>
    <span>{formk.errors.email}</span>
    <span>{formError}</span>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name="password" onChange={formk.handleChange} value={formk.values.password} placeholder="Password"/>
    <span>{formk.errors.password}</span><br/>
    <span>{formError}</span>
  </div>
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
    
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <button type="button" className="btn btn-primary m-3" onClick={()=>setRegisterVlaue(true)}>Register</button>
</form>
                    </div>

               
                </div>
          
            
            </div>

        </div></>}></Route>
      </Routes>
    
    </BrowserRouter>

  
    </>
    
    )
    
    :
    <center><ErrorApp/></center>
    }
    </div>
    
    </>
  )
}