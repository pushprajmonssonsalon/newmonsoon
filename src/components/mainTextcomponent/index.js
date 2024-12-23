import './maintext.css'
export default function MainText({textdata}) {
  return (
    <>
<div className='flex items-center justify-center flex-col'>
    <h2 className='aboutcontainertext ' style={{marginBottom: '0px'}}>{textdata}</h2>
    {/* <img 
        src={LOCAL_IMAGES.lineIcon} 
        alt="Monsoon Salon"
        style={{marginTop: '5px'}}
    /> */}
</div>
    </>

  )
}
