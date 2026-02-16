import { useEffect, useRef, useState } from "react";
import MainText from "../../components/mainTextcomponent";
import { getApiCall } from "../../utils/services";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FaClock, FaFilter, FaMapPin, FaSearch, FaStar } from "react-icons/fa";
import { IoNavigate } from "react-icons/io5";

const Locations = () => {
  const [salons, setSalons] = useState([]);
  const [filterSalons, setFilterSalons] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    getApiCall(
      "salons",

      (res) => {
        setSalons(res);
        console.log(res?.map((elm)=>elm._id),"salons")
      },
      (err) => { }
    );
  }, []);
  let arr=[
    "61ea59ddcb083202e8e5af84",
    "632831991c1ed46df4f2a39e",
    "6027c23499ed2c6612cf241d",
    "605c90a71e3ed5375545e1f4",
    "65aa29d6a8758f9cb542d26f",
    "65aa29d6a8758f9cb542d278",
    "65aa29d6a8758f9cb542d27b",
    "65aa29d6a8758f9cb542d287",
    "65aa29d6a8758f9cb542d26c",
    "65aa29d6a8758f9cb542d285",
    "65aa29d6a8758f9cb542d289",
    "65aa29d6a8758f9cb542d277",
    "65aa29d6a8758f9cb542d284",
    "65aa29d6a8758f9cb542d26b",
    "65aa29d6a8758f9cb542d272",
    "62fdd4e66f264ab6c15a3ccd",
    "601a50be94675375189a1f08",
    "65aa29d6a8758f9cb542d27f",
    "65aa29d6a8758f9cb542d283",
    "65aa29d6a8758f9cb542d288",
    "65aa29d6a8758f9cb542d26d",
    "66e2af8ddf7573853816bb5f",
    "60c329d8031ffd6e924e60fc",
    "62faf6cf3d304d7b51e3ac05",
    "65aa29d6a8758f9cb542d270",
    "6660554c07a1db23039fe58c",
    "5f54b67be83cec41bd7648b3",
    "65aa29d6a8758f9cb542d274",
    "65aa29d6a8758f9cb542d27e",
    "65aa29d6a8758f9cb542d273",
    "65aa29d6a8758f9cb542d275",
    "65aa29d6a8758f9cb542d27d",
    "65aa29d6a8758f9cb542d281",
    "65aa29d6a8758f9cb542d282",
    "669658564b4131b93753a35e",
    "6238591825ce9b713b4c68d0",
    "65aa29d6a8758f9cb542d271",
    "65aa29d6a8758f9cb542d27c",
    "65aa29d6a8758f9cb542d280",
    "65aa29d6a8758f9cb542d286",
    "65aa29d6a8758f9cb542d279",
    "65aa29d6a8758f9cb542d27a",
    "66fa6c46995da128d6f01cb2",
    "674453aa60cc0db932011c54",
    "67caca89c3a6b82924065c15",
    "67e0dc6b55b8a70880a252cb",
    "67ff5608564d02be0e34d7d6",
    "67ff5a4d564d02be0e34d7db",
    "684fc0aadd70be9bdbc55f56",
    "68621a568f434e3508101ddb",
    "68ad87e9babf8c1847151a55",
    "68ea0bc8134c8e50a1cd4976",
    "68ea3471134c8e50a1cd498f"
]
const BASE_URL = "https://monsoonsalon.com/salon-location-near-me/";
const lastmod = new Date().toISOString();

const sitemapEntries = arr
  .map(
    (id) => `
  <url>
    <loc>${BASE_URL}${id}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>`
  )
  .join("");

console.log(sitemapEntries,"updateArr")
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
  let MonsoonImage = "https://smartsalon.in/static/media/monsoon_logo.d13fe17aff633a52f677.png"
  let MonsoonProImage = "https://smartsalon.in/static/media/newLogooo.ea324a2b4aaefefd6201.png"
  const getImageUrl = (salon) => {

    return salon.name === "Monsoon" ? MonsoonImage : MonsoonProImage

  }


  return (
    <>
      <Helmet>
        <title>
          Monsoon Salon | Salon Franchise in Chennai, Noida, Pune & More
        </title>
        <meta
          name="description"
          content="Explore Monsoon Salon – cheap and best salon franchise in Chennai, plus salon franchises in Noida, Pune, Ahmedabad, Bangalore, Kolkata, Lucknow & more."
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
      <div className="min-h-screen">
        <div className="pt-9 pb-16">
          <div className="py-9">
            <div className="w-[90%] md:w-[80%] mx-auto">
  <h1 className="font-bold text-xl text-center leading-2xl  px-6  md:text-[2.5rem] md:leading-[3rem] mb-4">
          Explore Premium Beauty Salons and Franchise Opportunities Across India
          </h1>
           
            <p className="text-center text-gray-600 mt-4">

            India&#39;s beauty industry is experiencing a dynamic transformation, with premium salons
            offering cutting-edge services designed to elevate your self-care routine. From rejuvenating
            facials to trendy hair makeovers, the finest beauty salons across the country promise
            exceptional treatments that blend luxury, expertise, and personalized care. Whether you&#39;re in
            a metropolitan hub or a growing city, these salons offer an unforgettable experience that
            leaves you feeling refreshed, confident, and beautiful.

            </p>
            <p className="text-center text-gray-600 mt-4">
            For those seeking <strong>affordable yet high-quality beauty services</strong>, cities like <strong>Chennai</strong> are
            home to some of the <strong>cheapest and best salon franchises</strong> in India. These franchises offer the
            perfect mix of expert care and cost-effective pricing, ensuring clients get the best value
            without compromising on quality. The <strong>salon franchise in Chennai </strong>has become a sought-
            after choice for entrepreneurs looking to invest in a fast-growing industry with immense
            potential.

            </p>
            <p className="text-center text-gray-600 mt-4">
            In India’s bustling metropolitan cities like <strong>Delhi, Mumbai, Bangalore, Hyderabad</strong>, and
            Kolkata, salon franchises are flourishing. Cities like <strong>Noida, Pune, Ahmedabad</strong>, and
            <strong>Chandigarh</strong> also feature thriving beauty markets, creating lucrative opportunities for
            business owners through <strong>salon franchise</strong> models. Whether you’re looking for a hair salon
            franchise for sale or aiming to invest in a <strong>salon franchise in Pune</strong>, these cities offer prime
            locations and a strong customer base for franchise growth.

            </p>
            <p className="text-center text-gray-600 mt-4">
            From the metros to tier-2 cities like <strong>Surat, Jaipur, Indore,</strong> and <strong>Lucknow</strong>, India&#39;s beauty
            salons are redefining the salon experience. With a growing demand for premium beauty
            services in <strong>Nagpur, Coimbatore, Bhubaneswar</strong>, and <strong>Visakhapatnam</strong>, opportunities to own
            a salon franchise have never been better.

            </p>
            <p className="text-center text-gray-600 mt-4">

            Whether you’re a client looking for luxurious, high-quality beauty services or an entrepreneur
            ready to invest in the growing beauty industry, <strong>salon franchises</strong> in cities across India—from
            <strong> Kochi to Gurgaon</strong>—offer unmatched business potential and an exceptional customer
            experience.
            </p>
            </div>
          </div>

            <MainText textdata={"Our Premium Salons"} />
            <h2 className="text-center text-gray-600 mt-4  mx-auto max-w-2xl mb-4">
              Discover the finest beauty salons across India. Professional services, expert stylists, and luxurious experiences await you.
            </h2>
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
                      alt={`${salon?.name} ${salon?.stateName}`}
                      style={{ aspectRatio: "290 / 95" }}
                      className="w-1/3"
                    />

                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">
                        {salon.name}
                      </div>

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
