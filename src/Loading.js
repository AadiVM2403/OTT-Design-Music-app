import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import './loading.css';

function Loading({ done }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json) => {
          setData(json);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }, 2000);
  }, []);

  return (
    <div className="loading-container">
      {!done ? (
        <div className="loading-spinner">
          <ReactLoading
            type={"spin"}
            color={"#FF0000"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Loading;

