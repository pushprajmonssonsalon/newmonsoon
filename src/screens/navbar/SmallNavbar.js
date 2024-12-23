import LOCAL_IMAGES from "../utils/localImages";
import Sidebar from '../../components/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SmallNavbar = () => {
    const navigate = useNavigate();
    const handleFinder=()=>{
        navigate('/salonfinder')
    }
  return (
    <>
    <Helmet>
    <link rel="preload" as="image" href={LOCAL_IMAGES.monsoonlogo} />

    </Helmet>
    <div className='flex justify-between w-full items-center  px-6 py-3 sticky top-0 z-10 text-white bg-primary'>
       {/* <MdOutlineMenu className='text-3xl font-bold'/> */}
       <Sidebar />
        <Link to="/"><img src={LOCAL_IMAGES.monsoonlogo} alt="monsoon salon" loading="lazy" className='w-[200px] h-18'/></Link>
        <div></div>
    </div>
    </>
  )
}

export default SmallNavbar