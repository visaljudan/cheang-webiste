// import React, { useState } from "react";
// import FormField from "../formField/FormField";
// import { FaSearch } from "react-icons/fa";
// // import {  } from "../../data/Location";
// import ServiceList from "../../data/ServiceList";

// const SearchFilter = () => {
//   //Location//
//   const [selectedProvince, setSelectedProvince] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const handleProvinceChange = (event) => {
//     setSelectedProvince(event.target.value);
//     setSelectedCity(""); // Reset city when province changes
//     setFormData({
//       ...formData,
//       province: event.target.value, // Set the province in formData
//       city: "", // Reset city in formData
//     });
//   };

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//     setFormData({
//       ...formData,
//       city: event.target.value, // Set the city in formData
//       location: `${selectedProvince} ${event.target.value}`,
//     });
//   };
//   return (
//     <>
//       <FormField
//         type="text"
//         name="searchUser"
//         //   value={formData.password}
//         //   onChange={handleChange}
//         placeholder="Search for Brand Name"
//         required
//       />
//       <button>
//         <FaSearch />
//       </button>
//       <div className="select">
//         <select
//           id="province"
//           name="province"
//           //   value={selectedProvince}
//           //   onChange={handleProvinceChange}
//         >
//           <option value="">Select Province</option>
//           {provinces.map((province) => (
//             <option key={province} value={province}>
//               {province}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <select
//           id="city"
//           name="city"
//           value={selectedCity}
//           // onChange={handleCityChange}
//           // disabled={!selectedProvince} // Disable city dropdown if no province selected
//         >
//           <option value="">Select City</option>
//           {cities[selectedProvince]?.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="select">
//         <select
//           id="typeService"
//           name="typeService"
//           //   value={formData.typeService}
//           //   onChange={handleChange}
//         >
//           <option value="">Select Type Service</option>
//           {ServiceList.slice(1).map((service) => (
//             <option key={service.id} value={service.value}>
//               {service.value}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="select">
//         <select
//           id="rate"
//           name="ratings"
//           //   value={formData.typeService}
//           //   onChange={handleChange}
//         >
//           <option value="">Rate</option>
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//         </select>
//       </div>
//     </>
//   );
// };

// export default SearchFilter;

import React from "react";

const SearchFilter = () => {
  return <div>SearchFilter</div>;
};

export default SearchFilter;
