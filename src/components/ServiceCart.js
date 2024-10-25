const ServiceCart = ({ img, name, desc, index }) => {
  return (
   
      <div className="flex flex-col md:justify-start justify-start items-start md:items-start bg-white rounded-lg  h-full px-2 py-3">
        <div className="flex p-3 md:px-6 pt-3 md:pt-6 justify-start gap-3 items-center">
          <img
            src={img}
            alt="profile"
            className="w-16 h-16 sm:w-18 sm:h-18 bg-white rounded-full mb-3"
            loading="lazy"
          />
          <div>
          <h1 className="text-2xl text-regel-gray font-bold roboto-medium-italic">
            {name}
          </h1>
          <div className="text-lg  text-regel-gray mt-2 md:mt-5 flex flex-wrap roboto-medium-italic">
          <p className="text-lg roboto-medium-italic ">{desc}</p>
        </div>
        </div>
        </div>
     
      </div>
  
  );
};

export default ServiceCart;
