import axios from 'axios';

//n-word: json-server --watch db.json --routes routes.json

export default axios.create({
    baseURL: "https://ts-opensource-be.herokuapp.com/",
    //baseURL:"https://ts-appsweb-be.azurewebsites.net/",
    //baseURL:"http://localhost:8085/",
    params: {"Access-Control-Allow-Origin": "*"},
    headers: {
        "Content-type": "application/json",
    }
});