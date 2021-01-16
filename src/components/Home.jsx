import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Typography, GridList } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies } from '../api';
import Lists from './movie/display/Lists';

const useStyles = makeStyles(() => ({
    section: {
        display: 'flex',
        flexWrap: 'wrap',
        overflowX: 'scroll',
        marginBottom: 32
    },
    sectionTitle: {
        float: 'left'
    },
    sectionButton: {
        float: 'right'
    },
    cardWrapper: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflow: 'visible'
    }
}));

const Home = () => {
    const classes = useStyles();

    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await getNowPlayingMovies(1));
            setPopular(await getPopularMovies(1));
            setTopRated(await getTopRatedMovies(1));
        };

        fetchAPI();
    }, []);

    const nowPlayingList = nowPlaying.slice(0,10).map((item) => {
        return (
            <Lists
                key={item.id}
                item={item}
            />
        );
    });

    const popularList = popular.slice(0,10).map((item) => {
        return (
            <Lists
                key={item.id}
                item={item}
            />
        );
    });

    const topRatedList = topRated.slice(0,10).map((item) => {
        return (
            <Lists
                key={item.id}
                item={item}
            />
        );
    });

    return (
        <Container maxWidth="md">
            <Grid container spacing={1}>
                <Grid item sm={12} xs={12}>
                    <Typography variant="h6" className={classes.sectionTitle}>
                        NOW PLAYING
                    </Typography>
                    <Button className={classes.sectionButton} component={Link} to={'/movies/now_playing'}>
                        see more
                    </Button>
                </Grid>
                <Grid item className={classes.section}>
                    <GridList className={classes.cardWrapper}>
                        {nowPlayingList}
                    </GridList>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Typography variant="h6" className={classes.sectionTitle}>
                        POPULAR
                    </Typography>
                    <Button className={classes.sectionButton} component={Link} to={'/movies/popular'}>
                        see more
                    </Button>
                </Grid>
                <Grid item className={classes.section}>
                    <GridList className={classes.cardWrapper}>
                        {popularList}
                    </GridList>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Typography variant="h6" className={classes.sectionTitle}>
                        TOP RATED
                    </Typography>
                    <Button className={classes.sectionButton} component={Link} to={'/movies/top_rated'}>
                        see more
                    </Button>
                </Grid>
                <Grid item className={classes.section}>
                    <GridList className={classes.cardWrapper}>
                        {topRatedList}
                    </GridList>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;