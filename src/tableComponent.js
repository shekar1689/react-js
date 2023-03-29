// import React from "react";

// export function TableApp(){
//     return(
//         <>
//         <table className="table  table-striped table-hover mt-3">
//       <thead className="table-primary">
//         <tr>
//         <th ><span className="fa fa-globe me-3"></span>Name{order==='DSC' ?<span className='fa fa-arrow-down ms-4'></span>:order==='ASC'?<span  className="fa fa-arrow-up ms-4"></span>:<span  className="fa  ms-4"></span>}</th>
//         <th>Capital</th>
//         <th>Flag</th>
//         <th>Population{poporder==='DSC' ?<span className='fa fa-arrow-down ms-2'></span>:poporder==='ASC'?<span  className="fa fa-arrow-up ms-2"></span>:<span  className="fa  ms-4"></span>}</th>
//         <th>Languages</th>

//         </tr>
        
//       </thead>
//       <tbody className="table-dark">
//         {data.map((res_data,index)=>
//             <>
//             <tr key={index}>
//               <td >{res_data.name['common']}</td>
//               <td>{res_data.capital}</td>
//               <td><img src={res_data.flags.png} alt="loading" /></td>
//               <td>{res_data.population}</td>
//               <td>
//                 <ul>
//               { res_data.languages && Object.keys(res_data.languages)?.map(
//       (answer, index) => (
//         <>
//         <li key={index}>{res_data.languages[answer]}</li>
//         </>
          
  
//       )
//      )}
//      </ul>
//               </td>
              
//             </tr>
//             </>
//           )}
//       </tbody>

//     </table>
//         </>
//     )
// }