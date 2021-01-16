import axios from 'axios';

const apiKey = '53a8cc47281d4f2370dc5cd990641dff';
const url = 'https://api.themoviedb.org/3';

const nowPlayingUrl = `${url}/movie/now_playing`;
const popularUrl = `${url}/movie/popular`;
const topRatedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/person`;
const searchUrl = `${url}/search/movie`;

export const getNowPlayingMovies = async (currentPage) => {
    try {
        const { data } = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: currentPage
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularity'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average']
        }))

        return modifiedData;
    } catch (err) {
        console.error(err);
        
        return err;
    }
};

export const getPopularMovies = async (currentPage) => {
    try {
        const { data } = await axios.get(popularUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: currentPage
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularity'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average']
        }))

        return modifiedData;
    } catch (err) {
        console.error(err);

        return err;
    }
};

export const getTopRatedMovies = async (currentPage) => {
    try {
        const { data } = await axios.get(topRatedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: currentPage
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularity'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average']
        }));

        return modifiedData;
    } catch (err) {
        console.error(err);
        
        return err;
    }
};

export const getMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const imdbUrl = 'https://www.imdb.com/title/';
        const modifiedData = {
            id: data['id'],
            backPoster: posterUrl + data['backdrop_path'],
            popularity: data['popularity'],
            tagline: data['tagline'],
            title: data['title'],
            poster: posterUrl + data['poster_path'],
            overview: data['overview'],
            rating: data['vote_average'],
            genres: data['genres'],
            status: data['status'],
            runtime: data['runtime'],
            revenue: data['revenue'],
            releaseDate: data['release_date'],
            voteCount: data['vote_count'],
            homepage: data['homepage'],
            imdb: imdbUrl + data['imdb_id']
        };

        return modifiedData;
    } catch (err) {
        console.error(err);

        return err;
    }
}

export const getMovieVideos = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
            }
        });
        return data['results'][0];
    } catch (err) {
        console.error(err);
        
        return err;
    }
};

export const getGenres = async () => {
    try {
        const { data } = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        const modifiedData = data['genres'].map((genre) => ({
            id: genre['id'],
            name: genre['name']
        }))

        return modifiedData;
    } catch (err) {
        console.error(err);
        
        return err;
    }
};

export const getMoviesByGenre = async (id, currentPage) => {
    try {
        const { data } = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: currentPage,
                with_genres: id
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularity'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
        }))

        return modifiedData;
    } catch (err) {
        console.error(err);
        
        return err;
    }
};

export const getCasts = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey,
            }
        });
        const profileUrl = 'https://image.tmdb.org/t/p/original';
        const modifiedData = data['cast'].map((cast) => ({
            id: cast['id'],
            character: cast['character'],
            name: cast['name'],
            profile: profileUrl + cast['profile_path']
        }));

        return modifiedData;
    } catch (err) {
        console.error(err);
        
        return err;
    }
};

export const getSimilarMovies = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularity'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
        }))

        return modifiedData;
    } catch (err) {
        console.error(err);
        
        return err;
    }
}

export const getSearchMovies = async (search) => {
    try {
        const { data } = await axios.get(`${searchUrl}`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                query: `${search}`
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularity'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
        }));

        return modifiedData;
    } catch (err) {
        console.error(err);
        
        return err;
    }
}

export const getPersons = async (id) => {
    try {
        const { data } = await axios.get(`${personUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US',
            }
        });
        const profileUrl = 'https://image.tmdb.org/t/p/original';
        const modifiedData = {
            id: data['id'],
            name: data['name'],
            profile: profileUrl + data['profile_path'],
            birthday: data['birthday'],
            biography: data['biography']
        };

        return modifiedData;
    } catch (err) {
        console.error(err);

        return err;
    }
}