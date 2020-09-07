import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  // let movieInDb = {};
  // movieInDb.title = movie.title;
  // movieInDb.genreId = movie.genreId;
  // movieInDb.numberInStock = movie.numberInStock;
  // movieInDb.dailyRentalRate = movie.dailyRentalRate;

  //implementation above is awesome but too much lines of code

  // note: do not directly modify the movie cos it is part of the state

  const body = { ...movie };
  delete body._id;

  return movie._id
    ? http.put(movieUrl(movie._id), body)
    : http.post(apiEndpoint, body);
}

export function deleteMovie(id) {
  http.delete(movieUrl(id));
}
