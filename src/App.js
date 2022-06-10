/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [datafetching, useGetData] = useState([]);
  const [name, useName] = useState("");
  const [image, useImage] = useState("");
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

  // Handel Submit the data in the form
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        "https://629e71fe3dda090f3c19d701.mockapi.io/v1/meals",
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            image: image,
          }),
        }
      );

      let resJson = await res.json();
      if (res.status === 200) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useName("");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useImage("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
      // console.log(resJson);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="formSend">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            onChange={(e) => useName(e.target.value)}
          />
          <input
            type="url"
            value={image}
            placeholder="URL"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            onChange={(e) => useImage(e.target.value)}
          />
          <button type="submit">Add</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <div className="contCards">
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
