import React, { useState } from 'react'
import './requestcall.css'
import Validation from '../utils/commonFunctions';
// import Validation from '../utils/CommonFunctionss';


export default function Requestcall() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        // Add more fields as needed
      });
      const [error,setError]=useState([])
      console.log("userdata",error)

    const handleSubmit=(e)=>{
     console.log("errormesg",e.preventDefault() )
     setUserData({
      firstName: '',
      lastName: '',
      email: '',
      // Add more fields as needed
    })
  
    }
    const handleChange=(e)=>
    {
        const { name, value } = e.target;
        setUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setError(Validation(userData))
    }

  return (
    <div style={{ backgroundColor:'grey'}}>
   {/* <img src='https://www.monsoonsalon.com/wp-content/uploads/2021/08/2B2A9227-edit-1536x1024.jpg' alt='salonimage'/> */}
     
 
      {/* <h2>User Details Form</h2> */}
      <h4 className='callbackStyle'>Request Call Back</h4>
      <form onSubmit={handleSubmit}
      style={{}}>
        
          {/* <label>First Name:</label> */}
          <input
          className='textinputstyle'
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            placeholder='First Name'
            

          />
          {/* {error.name && <p className='errorstyle'>{error.name}</p>} */}
        
     
          {/* <label>Last Name:</label> */}
          {/* <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            placeholder='Last Name'
          className='textinputstyle'
          // onFocus={}


          /> */}
       
          {/* <label>Email:</label> */}
          {/* <input
            type=""
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder='Enter your email address'
          className='textinputstyle'


          /> */}
          {/* {error.email && <p className='errorstyle'>{error.email}</p>} */}
     
        {/* Add more input fields here */}
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}
