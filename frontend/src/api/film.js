import client from "./client";

//Get the Film and chapter adn other information.
const getFilm = () => client.get("/films/Route_66");

export { getFilm };
