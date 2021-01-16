import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies } from '../../api';
import Tiles from './display/Tiles';

const useStyles = makeStyles(() => ({
    pageButton: {
        flexGrow: 1,
        marginRight: 8
    }
}));

const Section = ({ match }) => {
    const classes = useStyles();

    const [section, setSection] = useState([]);
    const [page, setPage] = useState(1);

    let params = match.params;

    useEffect(() => {
        if (params.section === "now_playing") {
            const fetchAPI = async () => {
                setSection(await getNowPlayingMovies(page));
            };

            fetchAPI();
        } else if (params.section === "popular") {
            const fetchAPI = async () => {
                setSection(await getPopularMovies(page));
            };

            fetchAPI();
        } else {
            const fetchAPI = async () => {
                setSection(await getTopRatedMovies(page));
            };

            fetchAPI();
        }
    }, [params.section, page]);

    let sectionTitle;

    const setTitle = () => {
        if (params.section === "now_playing") {
            sectionTitle = "Now Playing";
        } else if (params.section === "popular") {
            sectionTitle = "Popular";
        } else {
            sectionTitle = "Top Rated";
        }
    };

    setTitle();

    const showMovies = section.map((item) => {
        return (
            <Grid item sm={3} xs={6} key={item.id} component={Link} to={`/movie/${item.id}`}>
                <Tiles 
                    item={item}
                />
            </Grid>
        );
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
                    <Typography variant="h5" align="center">
                        {sectionTitle.toUpperCase()}
                    </Typography>
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

export default Section;