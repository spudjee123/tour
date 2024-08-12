import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [trips, setTrips] = useState([]);

  const searchTravel = async (keywords = "") => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${keywords}`
      );
      const travelData = response.data.data;
      setTrips(travelData);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    searchTravel(searchTerm);
  }, [searchTerm]);

  const handleCategoryClick = (category) => {
    setSearchTerm((prev) => (prev ? `${prev} ${category}` : category));
  };

  return (
    <div className="font-Rubik">
      <div>
        <h1 className="text-blue-500 text-5xl flex items-center justify-center mt-16">
          เที่ยวไหนดี
        </h1>
      </div>

      <div className="w-full">
        <p className="w-screen pl-40">ค้นหาที่เที่ยว</p>
        <form className="w-screen flex items-center justify-center mt-5">
          <input
            type="text"
            id="search"
            placeholder="หาที่เที่ยวแล้วไปกัน  ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="border-solid border-[1px] w-10/12 ml-40"></div>
      </div>

      <div className="mt-10 flex items-center justify-center flex-col">
        {trips.map((trip) => (
          <div key={trip.id} className="w-11/12 mb-10 flex">
            <div>
              <img
                className="h-[250px] w-[350px] rounded-3xl"
                src={trip.photos[0]}
                alt={trip.title}
              />
            </div>
            <div className="ml-10">
              <h3 className="text-3xl">
                <a href={trip.url} target="_blank" rel="noopener noreferrer">
                  {trip.title}
                </a>
              </h3>
              <p className="text-xl">{trip.description.substring(0, 100)}...</p>
              <button
                className="text-blue-500"
                onClick={() => window.open(trip.url, "_blank")}
              >
                อ่านต่อ
              </button>
              <div className="flex ">
                <p className="mr-4">หมวด:</p>
                {trip.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="underline mr-4 cursor-pointer"
                    onClick={() => handleCategoryClick(tag)}
                  >
                    {tag}
                  </p>
                ))}
              </div>
              <div className="w-[350px] flex justify-between mt-4">
                {trip.photos.slice(1, 4).map((photo, index) => (
                  <img
                    key={index}
                    className="h-[100px] w-[100px] rounded-lg"
                    src={photo}
                    alt={`${trip.title} photo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
