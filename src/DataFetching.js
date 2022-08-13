import React, { useState, useEffect } from "react";
import axios from "axios";

function DataFetching() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    //   .then(res=>{console.log(res)})

    const axios = require("axios");
    const options = {
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users',
      params: {team: '1', season: '2021'},
      headers: {
        'X-RapidAPI-Key': 'd5561f3d5dmsh491af7a9b4521f7p17ca37jsn082907e605b9',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  })

  return (
    <div>
      {words.map((word) => (
        <div>word.title</div>
      ))}
    </div>
  );
}

export default DataFetching;
