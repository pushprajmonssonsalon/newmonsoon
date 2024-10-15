import React from 'react'
import LOCAL_IMAGES from '../utils/localImages'
import './homeabout.css'
import { useNavigate } from 'react-router-dom'
import MainText from '../../components/mainTextcomponent'

export default function HomapgeAbout() {
  const navigate = useNavigate()
  const onClick = () => {

    navigate('/franchise')
  }
  return (
    <div className='mainContainer aboutcontainer'>
      <div className='imgtextContainer'>

        <img src={LOCAL_IMAGES.aboutus_icon} alt='aboutusdiscption'
        className='saloniconimg' />

        <div className='namediscption'>
         
               <MainText textdata={"Who Are We? Best Salon Franchise in India"}/>

        
          <p className='aboutustext'> The Monsoon Salon is a nascent brand catering to sophisticated consumers seeking excellent talent with
            international expertise who are always improving and honing their craft. We are a company that will provide
            you with what you need via education, to upgrade skills of our artists to cater to our clients better each day.</p>
          <p className="aboutustext">We have a very particular, clear-cut plan that will be carried out over the course of the next three to five years,
            with the main focus being on professional, in-depth training. In our initial phase, Monsoon will be the market
            leader with smart placement across top 100 cities. We want to have over 100 salons within the next two years,
            with a further 200 sites added in the final two years of our expansion. We have a very solid information
            structure in place to accommodate this kind of growth.</p>
          <button className="my-button" onClick={onClick}>
            <p className='knowmoreText'>Know More</p>
          </button>
        </div>

      </div>

    </div>
  )
}
