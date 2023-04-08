import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDUyZDA4M2IxYjdlOGFiNTNmNzE5ZDU4MDhmZjU0OCIsInN1YiI6IjYzYzA0N2FhZWQ5NmJjMDA3ZGNmNjkwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6c5qE0WsFRGeL_Ze4vNyr8ZwJN9Sw8njoubOABTff-4"

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};