import { useEffect, useRef, useState } from "react";
import MainText from "../../components/mainTextcomponent";
import { getApiCall } from "../../utils/services";
import { Helmet } from "react-helmet";
import useDebouncer from "../../hooks/UseDebouncer";
import { useNavigate } from "react-router-dom";
import { FaClock, FaFilter, FaMapPin, FaSearch, FaStar } from "react-icons/fa";
import { IoNavigate } from "react-icons/io5";

const Locations = () => {
  const [salons, setSalons] = useState([]);
  const [filterSalons, setFilterSalons] = useState([]);
  const [text, setText] = useState("");
  const { debouncedFunction } = useDebouncer();
  const navigate = useNavigate();
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    getApiCall(
      "salons",

      (res) => {
        setSalons(res);
      },
      (err) => { }
    );
  }, []);
  const handleSingleSalon = async (id, locate) => {
    if (locate) {
      navigate(`${id}?scroll=${true}`);
    } else {
      navigate(`${id}`);
    }
  };

  



  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique states for filter
  const states = [...new Set(salons.map(salon => salon.stateName))].sort();

  // Filter salons based on search and state
const searchTimeoutRef = useRef(null);

const filterSalonsFunction = (query, state) => {
  console.log("Filtering with query:", query, "and state:", state);
  
  let filtered = salons;
  
  // Apply search filter
  if (query && query.trim().length > 0) {
    const searchTerm = query.toLowerCase().trim();
    filtered = filtered.filter(salon =>
      salon?.name?.toLowerCase().includes(searchTerm) ||
      salon?.address2?.toLowerCase().includes(searchTerm) ||
      salon?.stateName?.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply state filter
  if (state) {
    filtered = filtered.filter(salon => salon?.stateName === state);
  }
  
  setFilterSalons(filtered);
};

useEffect(() => {
  // Clear existing timeout
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }
  
  // If no search query and no selected state, show all salons immediately
  if (!searchQuery.trim() && !selectedState) {
    console.log("Showing all salons");
    setFilterSalons(salons);
    return;
  }
  
  // Set new timeout for debounced search
  searchTimeoutRef.current = setTimeout(() => {
    filterSalonsFunction(searchQuery, selectedState);
  }, 300); // 300ms delay
  
  // Cleanup function
  return () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };
}, [searchQuery, selectedState, salons]);

const clearFilters = () => {
  // Clear any pending timeout
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }
  
  setSearchQuery('');
  setSelectedState('');
};
let MonsoonImage="https://smartsalon.in/static/media/monsoon_logo.d13fe17aff633a52f677.png"
let MonsoonProImage="https://smartsalon.in/static/media/newLogooo.ea324a2b4aaefefd6201.png"
const getImageUrl =(salon)=>{

 return  salon.name==="Monsoon"?MonsoonImage:MonsoonProImage

}
  return (
    <>
      <Helmet>
        <title>
          Find Your Nearest Monsoon Salon - Explore Our Locations Across India
        </title>
        <meta
          name="description"
          content="Discover a Monsoon Salon near you! With branches nationwide, experience our premium beauty and grooming services, trusted professionals, and luxurious atmosphere at convenient locations across India."
        />
        <meta
          name="keywords"
          content="monsoon salon near me, monsoon salon near you, monsoon salon locations, citywise monsoon salon, monsoon salon franchise locations"
        />
        <link
          rel="canonical"
          href="https://monsoonsalon.com/salon-location-near-me"
        />
      </Helmet>
      <div className="min-h-screen ">
        <div className="pt-9 pb-16">
          <div className="py-9">
            <MainText textdata={"Our Premium Salons"} />
            <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover the finest beauty salons across India. Professional services, expert stylists, and luxurious experiences await you.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by salon name, or state..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                {/* State Filter */}
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedState) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-black  font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto mb-6">
            <p className="text-gray-600">
              Showing {filterSalons.length} salon{filterSalons.length !== 1 ? 's' : ''}
              {selectedState && ` in ${selectedState}`}
            </p>
          </div>

          {/* Salon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
            {filterSalons?.length > 0 ? (
              filterSalons.map((salon, idx) => (
                <div
                  key={idx}
                  className="bg-white relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                 <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                      <div className="flex items-center gap-1">
                        <FaStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{salon.rating}</span>
                      </div>
                    </div>
                  {/* Salon Image */}
                  <div className="relative p-6 border-black overflow-hidden">
                    <img
                      src={getImageUrl(salon)}
                      alt={salon.name}
                      style={{aspectRatio:"290 / 95"}}
                      className="w-1/3"
                    />
                   
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">
                        {salon.name}
                      </h2>

                      <div className="flex items-center gap-1 mb-2 text-gray-600">
                        <FaMapPin className="w-4 h-4" />
                        <span className="text-sm"> {salon.stateName}</span>
                      </div>

                      <div className="flex items-center gap-1 mb-2 text-gray-600">
                        <FaClock className="w-4 h-4" />
                        <span className="text-sm">10:00 AM - 10:00 PM</span>
                      </div>

                     
                     

                      {/* Services Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {salon?.services?.slice(0, 2).map((service, i) => (
                          <span key={i} className="text-xs bg-black text-white px-2 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                        {salon?.services?.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{salon.services.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSingleSalon(salon._id, true)}
                        className="flex-1 text-white bg-black font-semibold py-3 rounded-xl  transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <IoNavigate className="w-4 h-4" />
                        Locate
                      </button>
                      <button
                        onClick={() => handleSingleSalon(salon._id, false)}
                        className="flex-1 border-2 bg-white text-black font-semibold py-3 rounded-xl  hover:text-white hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Visit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-gray-400 mb-4">
                  <FaSearch className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No salons found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or clear filters to see all salons.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-black text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Locations;
