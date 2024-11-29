import { useEffect, useState } from "react";
import MainText from "../../components/mainTextcomponent";
import { getApiCall } from "../../utils/services";
import { Helmet } from "react-helmet";
import SearchInput from "../../components/customInputs/SearchInput";
import useDebouncer from "../../hooks/UseDebouncer";
import { useNavigate } from "react-router-dom";

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
      (err) => {}
    );
  }, []);
  const handleSingleSalon = async (id, locate) => {
    if (locate) {
      navigate(`${id}?scroll=${true}`);
    } else {
      navigate(`${id}`);
    }
  };

  const searchSalons = () => {
    const filtered = salons.filter((elm) =>
      elm.stateName
        ?.split(" ")
        ?.join("")
        ?.toLowerCase()
        ?.includes(text?.split(" ")?.join("")?.toLowerCase())
    );

    
    setFilterSalons(filtered);
  };

  useEffect(() => {
    if (text.length === 0) {
      setFilterSalons(salons);
    }
    debouncedFunction(searchSalons, 300);
  }, [text, salons]);
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
      <div className="pt-9 pb-16">
        <div className="py-9">
          <MainText textdata={"Our Salons"} />
        </div>
        <div className="flex items-center justify-center mb-9">
          <SearchInput
            name="search"
            value={text}
            placeholder="Search State..."
            onChange={handleTextChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh]  lg:grid-cols-3 xl:grid-cols-4  gap-5 w-[95%] md:[90%] lg:w-[85%] xl:w-[80%] mx-auto">
          {filterSalons?.length > 0 &&
            filterSalons?.map((salon, idx) => {
              return (
                <div
                  key={idx}
                  className="border bg-neutral-50 flex flex-col min-h-[300px] gap-5 justify-between rounded-[25px] p-6 shadow-md "
                >
                  <div className="">
                    <h2 className="font-bold text-2xl mb-3">{salon.name}</h2>
                    <h2 className=" text-lg mb-3 line-clamp-4 overflow-hidden text-ellipsis">
                      {salon.address} {salon.address2}
                    </h2>
                  </div>
                  <div className="">
                    <h2 className=" text-lg font-medium  mb-3">
                      {salon.stateName}
                    </h2>

                    <div className="flex gap-3 ">
                      <button
                        onClick={() => handleSingleSalon(salon._id, true)}
                        className="transition-all ease-in duration-100 bg-black border border-transparent hover:border-black hover:bg-white hover:text-black  w-1/2 h-[40px] flex items-center justify-center text-white font-bold text-md rounded-md "
                      >
                        Locate
                      </button>
                      <button
                        onClick={() => handleSingleSalon(salon._id, false)}
                        className="transition-all ease-in duration-100 border border-black  w-1/2 h-[40px] hover:bg-black hover:text-white flex items-center justify-center text-black font-bold text-md rounded-md"
                      >
                        Visit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Locations;
