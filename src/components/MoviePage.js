import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Button,
	Col,
	Form,
	FormControl,
	InputGroup,
	Row,
} from "react-bootstrap";
import Loader from "./Loader/Loader";
import MovieCard from "./MovieCard";
import NoMoviesFound from "./NoMoviesFound";
import { changeLoad } from "../actions/actions";

export default function MoviePage() {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const [movies, setMovies] = useState([]);
	const name = useSelector((state) => state.name);
	const loading = useSelector((state) => state.loading);
	const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

	useEffect(() => {
		const getDefaultMovies = async () => {
			changeLoad(dispatch);
			const response = await fetch(
				`http://www.omdbapi.com/?apikey=${API_KEY}&s=Dark Knight`,
				{
					headers: { Accept: "application/json" },
				}
			);
			const parsedData = await response.json();
			setMovies(parsedData.Search);
		};
		getDefaultMovies();
	}, []);

	const getMovies = async () => {
		changeLoad(dispatch);
		const response = await fetch(
			`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`,
			{
				headers: { Accept: "application/json" },
			}
		);
		const parsedData = await response.json();
		if (parsedData) {
			setMovies(parsedData.Search);
		} else {
			setMovies([]);
		}
		changeLoad(dispatch);
	};

	return (
		<div className="main-page-content">
			<h1 className="main-header">Moviflix</h1>
			<h3 className="sub-header">{name}, try searching for any Movie</h3>
			<Form
				className="search-form"
				onSubmit={(e) => {
					e.preventDefault();
					getMovies();
				}}
			>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Search Movies"
						aria-label="Search Movies"
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						required
					/>
					<InputGroup.Append>
						<Button type="submit" variant="secondary">
							Search
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</Form>
			{!movies ? (
				<NoMoviesFound />
			) : !loading ? (
				<Loader />
			) : (
				<Row className="movie-container">
					{movies.map((movie) => {
						return (
							<Col
								key={movie.imdbID}
								xs={12}
								sm={6}
								md={4}
								lg={3}
								className="mb-4"
							>
								<MovieCard movies={movie} />
							</Col>
						);
					})}
				</Row>
			)}
		</div>
	);
}
