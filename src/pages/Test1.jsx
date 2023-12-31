import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Test1() {
  const [dataRandom, setDataRandom] = useState([]);
  const [searchDataRandom, setSearchDataRandom] = useState([]);
  const [favoriteWord, setFavoriteWord] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);

  console.log(dataProduct);

  useEffect(() => {
    getDataRandom();
  }, []);

  const getDataRandom = async () => {
    try {
      const response = await axios.get(
        "https://random-word-api.herokuapp.com/word?number=100"
      );
      // console.log(response.data);
      setDataRandom(response.data);
      setSearchDataRandom(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const respnse = dataRandom.filter((item) => item.includes(e.target.value));
    // console.log(respnse);
    setSearchDataRandom(respnse);
  };

  const hanldeAddWordToFavorite = (word) => {
    // console.log(word);
    if (!favoriteWord.includes(word)) {
      setFavoriteWord(favoriteWord.concat(word));
    }
  };

  const hanldeReduceWordFromFavorite = (word) => {
    // console.log(word);
    const newFavoriteWord = favoriteWord.filter((item) => item !== word);
    setFavoriteWord(newFavoriteWord);
  };

  return (
    <div className="container" style={{ marginTop: "70px" }}>
      <h1>Favorite Words</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Text..."
          style={{
            border: "1px solid silver",
            borderRadius: "5px",
            padding: "8px",
            fontSize: "12px",
          }}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "250px",
          border: "1px solid silver",
          borderRadius: "7px",
          marginTop: "20px",
          overflowY: "scroll",
        }}
      >
        {searchDataRandom.sort().map((item, index) => {
          return (
            <div
              key={index}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>{item}</p>
              <button
                type="button"
                style={{
                  height: "30px",
                  backgroundColor: "#70a7ef",
                  color: "white",
                  width: "110px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  hanldeAddWordToFavorite(item);
                }}
              >
                Add to Favorite
              </button>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: "15px", fontWeight: "20" }}>
        Data : {searchDataRandom.length}
      </p>
      <hr />
      <div
        style={{
          width: "100%",
          height: "200px",
          border: "1px solid silver",
          borderRadius: "7px",
          marginTop: "40px",
          overflowY: "scroll",
        }}
      >
        {favoriteWord.sort().map((item, index) => {
          return (
            <div
              key={index}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>{item}</p>
              <button
                type="button"
                style={{
                  height: "30px",
                  backgroundColor: "red",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  color: "white",
                  width: "100px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  hanldeReduceWordFromFavorite(item);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: "15px", fontWeight: "20" }}>
        Data : {favoriteWord.length}
      </p>
    </div>
  );
}
