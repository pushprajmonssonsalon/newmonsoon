import Instagram from "../../screens/gallery/Instagram";

const InstaCard = ({url}) => {
  
  // const instagramPostUrl = 'https://www.instagram.com/p/C-90lRwpcFZ/'; // Replace with your Instagram post URL
  return (
    <>
    
      <Instagram url={url}/>
    </>
  );
};

export default InstaCard;
