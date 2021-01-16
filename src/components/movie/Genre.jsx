import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { getMoviesByGenre } from '../../api';
import Tiles from './display/Tiles';

const useStyles = makeStyles(() => ({
    pageButton: {
        flexGrow: 1,
        marginRight: 8
    }
}));

const Genre = ({ match }) => {
    const classes = useStyles();

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    let params = match.params;

    useEffect(() => {
        const fetchAPI = async () => {
            setMovies(await getMoviesByGenre(params.id, page));
        };

        fetchAPI();
    }, [params.id, page]);

    const showMovies = movies.map((item) => {
        return (
            <Grid item sm={3} xs={6} key={item.id} component={Link} to={`/movie/${item.id}`}>
                <Tiles 
                    item={item}
                />
            </Grid>
        )
    });

    const pageUp = () => {
        if (page !== 20) {
            setPage(page + 1);
        }
    };

    const pageDown = () => {
        if (page !== 1) {
            setPage(page - 1);
        }
    };

    let history = useHistory();

    const prevPage = () => {
        history.goBack();
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <Button onClick={prevPage}>
                        <ArrowBackIosIcon />
                        Back
                    </Button>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Typography align="center" gutterBottom>
                        Page: <strong>{page}</strong> / 20
                    </Typography>
                    <div style={{display: 'flex'}}>
                        <Button variant="contained" className={classes.pageButton} onClick={pageDown}>
                            Prev
                        </Button>
                        <Button variant="contained" className={classes.pageButton} onClick={pageUp}>
                            Next
                        </Button>
                    </div>
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

export default Genre;