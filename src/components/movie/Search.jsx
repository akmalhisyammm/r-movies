import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { getSearchMovies } from '../../api';
import Tiles from './display/Tiles';


const Search = () => {
    const [search, setSearch] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query === "") {
            setSearch([]);
        } else {
            const fetchAPI = async () => {
                setSearch(await getSearchMovies(query));
            };

            fetchAPI();
        }
    }, [query]);

    const showMovies = search.map((item) => {
        return (
            <Grid item sm={3} xs={6} key={item.id} component={Link} to={`/movie/${item.id}`}>
                <Tiles
                    item={item}
                />
            </Grid>
        )
    });

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <Button size="small" component={Link} to={'/'}>
                        <ArrowBackIosIcon />
                        Back
                    </Button>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField
                        placeholder="Search Movies..."
                        variant="standard"
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Grid container spacing={2}>
                        {showMovies}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Search;