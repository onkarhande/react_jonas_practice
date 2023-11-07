import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched, onDeleteWatched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');

    const isWatched = watched.map(o => o.imdbID).includes(selectedId);

    function handleStRating(rating) {
        setUserRating(rating);
    }

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    function handleOnAddWatch() {
        const newWatchedMovie = {
            imdbID: selectedId,
            Title: title,
            Year: year,
            Poster: poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ')[0]),
            userRating
        }
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(function () {
        setIsLoading(true);
        async function getMovieDetails() {
            let res = await fetch(`http://www.omdbapi.com/?apikey=43d6dbab&i=${selectedId}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }
        getMovieDetails();
    }, [selectedId]);

    useEffect(function () {
        if (!title) return;
        document.title = `Movie | ${title}`
    }, [title])

    useEffect(function () {
        let onEscapePress = (e) => {
            if (e.code === 'Escape') {
                onCloseMovie();
            }
        }
        document.addEventListener('keydown', onEscapePress)

        return function () {
            document.removeEventListener('keydown', onEscapePress);
        }
    }, [onCloseMovie])

    return (
        <div className="details">
            {isLoading ? <Loader></Loader> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        <img src={poster} alt={`Poster of ${movie}`}></img>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐️</span>{imdbRating} IMDB rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ?
                                <>
                                    <StarRating maxRating={10} size={24} onSetRating={handleStRating} defaultRating={userRating > 0 ? userRating : null}></StarRating>
                                    {userRating > 0 && <button
                                        className="btn-add"
                                        onClick={handleOnAddWatch}
                                    >+ Add to list</button>
                                    }
                                </>
                                :
                                <>
                                    <p>You rated the movie {watched.find(o => { return o.imdbID === selectedId }).userRating} ⭐️</p>
                                </>
                            }

                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed By {director}</p>
                    </section>
                </>
            }
        </div >
    )
}