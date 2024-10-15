import React from 'react'
import LOCAL_IMAGES from '../../screens/utils/localImages'
import './maintext.css'
export default function MainText({textdata}) {
  return (
    <>
<div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    <h2 className='aboutcontainertext' style={{marginBottom: '0px'}}>{textdata}</h2>
    {/* <img 
        src={LOCAL_IMAGES.lineIcon} 
        alt=''
        style={{marginTop: '5px'}}
    /> */}
</div>
    </>

  )
}
