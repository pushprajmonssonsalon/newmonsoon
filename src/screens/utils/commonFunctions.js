import React from "react";
const Validation = (data) => {
    const errormsg = {}
    const mobileNumberRegex = /^([0-9]{10})$/;
    // const passwordSpecialRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@%&$]).{8,15}$/;
    // const nameRegexMin2 = /^[a-zA-Z ]{2,50}$/;
    // const emailRgx =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if(data.email==='')
    // {
    //     errormsg.email="please enter email"
    // }
    // else if( !emailRgx.test(data.email))
    // {
    //     errormsg.email="please provide correct email"
    // }
    // if(data.name==='')
    // {
    //     errormsg.name="please enter valid name"
    // }
    // else if(!nameRegexMin2.test(data.firstName)){
    //     errormsg.name="provide correct name"
    // }
    if(data.mobileNumber==='')
    {
        errormsg.mobileNumber="provide mobile number"
    }
    else if(!mobileNumberRegex.test(data.mobileNumber))
    {
        errormsg.mobileNumber="entervalid number"

    }

return errormsg
}
export default Validation;