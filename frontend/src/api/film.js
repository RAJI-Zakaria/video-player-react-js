import client from "./client";

//Get the Film and chapter adn other information.
const getFilm = () => client.get("/film-json");

export { getFilm };
