import React from "react";
import './errorstyle.css';
export function ErrorApp(){
    return(
        <>
        <div className="error_dis">
        <div className="img_dis">
        <img src={"./error-404-con.jpg"} className=""/>
       
       <div className="error_text">
        <h3> Requested Page Not Found</h3>
        <h3> Requested Country Not Found</h3>
       </div>
       </div>
        </div>
        
        </>
    )
}