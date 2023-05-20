// import React, { useState, useEffect } from "react"
// import axios from "axios";
// import '../css/searchbar.css';

// export default function SearchBar (){

//     const [param, setparam] = useState([])
//     const [categorylist, setcategorylist] = useState([])
//   const [selectedOption, setSelectedOption] = useState('all');

//   useEffect(() => {
//     function getcategories() {
//         axios.get("http://localhost:8070/souvenir/getCategories").then((res) => {
//             setcategorylist(res.data);
//         }).catch((err) => {
//             alert(err.message)
//         })
//     }
//     getcategories();
// }, [])


// function getitems(e) {
//     e.preventDefault();
//     axios.get(`http://localhost:8070/item/getitembybrand/${param}`).then(res => {
//         setitems(res.data.items)
//     }).catch((err) => {
//         alert(err.message)
//     })
// }
//   return (
//     <form onSubmit={getitems} className="search-bar">
//       <label htmlFor="search-option" className="option-label">Search Category:</label>
//           <select id="search-option" value={selectedOption} onChange={(e) => { setparam(e.target.value) }} className="option-select">
//               <option value="">Select a Category</option>
//               {categorylist && categorylist.map((category, key) => (
//                   <option key={key}>{category.categoryName}</option>
//               ))}
//           </select>
//       <button type="submit" className="search-button">Search</button>
//     </form>
//   );
// };
