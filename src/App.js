/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [datafetching, useGetData] = useState([]);
  const [name , useName] = useState('');
  const [image , useImage] = useState('');
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const getingData = await fetch(
          "https://629e71fe3dda090f3c19d701.mockapi.io/v1/meals"
        );
        const res = await getingData.json();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGetData(res);
      } catch (err) {
        console.log(err, "error");
      }
    }
    fetchData().catch(console.error);
  }, []);

  useEffect((e)=>{
    async function sentingData(){
      e.preventDefault();
    try {
      let res = await fetch("https://629e71fe3dda090f3c19d701.mockapi.io/v1/meals", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          image: image
         
        }),
      })
    
    // let resJson = await res.json();
    //   if (res.status === 200) {
    //     useName("");
    //     useImage("");
    //     setMessage("User created successfully");
    //   } else {
    //     setMessage("Some error occured");
    //   }
    } catch (err) {
      console.log(err);
     }}
    sentingData()
  },[])
  return (
    <div className="container">
      {
        // eslint-disable-next-line array-callback-return
        datafetching?.map((item) => {
          return (
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <div className="cards" key={item.id}>
              <img src={item.image} alt="Image from API" />
              <p>{item.name}</p>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
// try{
//   const getingData = await fetch(
//     "https://629e71fe3dda090f3c19d701.mockapi.io/v1/meals"
//   )
//   const res = await getingData.json();
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useGetData(res)
//   console.log(res);
// }catch (err){
//   console.log(err , 'error');
// }
// const fetchingData = () => {
//   fetch("https://629e71fe3dda090f3c19d701.mockapi.io/v1/meals")
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     .then((response) => {
//       console.log(response.clone().json())
//      // eslint-disable-next-line react-hooks/rules-of-hooks
//      useGetData(response.clone().json())})
//     .catch((error) => console.error(error))
// };
// fetchingData();
