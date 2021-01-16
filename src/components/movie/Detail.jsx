import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { Container, Grid, GridList, Card, CardMedia, Button, Typography, Modal, Backdrop, Fade, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import LanguageIcon from '@material-ui/icons/Language';
import MovieIcon from '@material-ui/icons/Movie';
import { getCasts, getMovieDetail } from '../../api';
import Lists from '../person/display/Lists';
import Modals from '../person/display/Modals';

const useStyles = makeStyles((theme) => ({
    nav: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    card: {
        width: 300,
        height: 450,
        borderRadius: 20,
        padding: 0,
        marginBottom: 12
    },
    poster: {
        height: 450
    },
    status: {
        border: '1px solid green',
        borderRadius: 2,
        padding: 2,
        paddingLeft: 4,
        paddingRight: 4,
        marginRight: 12,
        color: 'green',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    linkButton: {
        textDecoration: 'none',
        color: 'inherit',
        marginLeft: 4,
        marginRight: 2
    },
    listWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'auto',
        marginBottom: 32
    },
    list: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        overflow: 'visible',
        margin: '0 !important'
    },
    modal: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 500,
        maxWidth: '100%',
        outline: 0
    },
    responsiveCenter: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }
}));

const MovieDetail = ({ match }) => {
    const classes = useStyles();

    const [detail, setDetail] = useState([]);
    const [casts, setCasts] = useState([]);
    const [open, setOpen] = useState(false);

    let params = match.params;

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await getMovieDetail(params.id));
            setCasts(await getCasts(params.id))
        };

        fetchAPI();
    }, [params.id]);

    let movieGenres;

    if (detail.genres) {
        movieGenres = detail.genres.map((item) => {
            return (
                <Typography variant="caption" key={item.id} style={{ marginRight: 12, border: '1px solid', borderRadius: 2, padding: 2, paddingLeft: 4, paddingRight: 4, marginBottom: 8, textDecoration: 'none', color: 'inherit' }} component={Link} to={`/movies/genre/${item.id}`}>
                    {item.name.toUpperCase()}
                </Typography>
            );
        });
    }

    const castList = casts.slice(0, 10).map((item) => {
        return (
            <Lists
                key={item.id}
                item={item}
            />
        );
    });

    const castModal = casts.map((item) => {
        return (
            <Modals
                key={item.id}
                item={item}
            />
        )
    });

    let history = useHistory();

    const prevPage = () => {
        history.goBack();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <Button size="small" onClick={prevPage}>
                        <ArrowBackIosIcon />
                        Back
                    </Button>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item md={12} sm={12} xs={12} className={classes.responsiveCenter}>
                            <Typography gutterBottom style={{ textTransform: 'uppercase' }}>
                                {detail.title} ({moment(detail.releaseDate).format('YYYY')})
                            </Typography>
                            <Rating
                                name="Rate"
                                value={detail.rating/2}
                                size="small"
                                readOnly
                            />
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} className={classes.responsiveCenter} style={{ marginBottom: 4 }}>
                            <Card className={classes.card}>
                                <CardMedia 
                                    component="img"
                                    image={detail.poster}
                                    title={detail.title}
                                    className={classes.poster}
                                />
                            </Card>
                            <Typography variant="caption" style={{ textTransform: 'uppercase' }}>
                                {detail.tagline}
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Typography variant="caption" className={classes.status}>
                                        {detail.status}
                                    </Typography>
                                    <Typography variant="caption">
                                        {detail.runtime} MINUTES
                                    </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    {movieGenres}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    <Grid container>
                        <Grid item md={12} sm={12} xs={12} style={{ marginBottom: 48, marginTop: 24 }}>
                            <Typography align="justify" gutterBottom>
                                {detail.overview}
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} style={{ marginBottom: 48 }}>
                            {detail.homepage ? (
                                <Button size="small" variant="outlined" style={{ marginRight: 12 }}>
                                    <LanguageIcon fontSize="small" />
                                    <a href={detail.homepage} target="_blank" rel="noreferrer" className={classes.linkButton}>
                                        Website
                                    </a>
                                </Button>
                            ) : (
                                false
                            )}
                            <Button size="small" variant="outlined" style={{ marginRight: 12 }}>
                                <MovieIcon fontSize="small" />
                                <a href={detail.imdb} target="_blank" rel="noreferrer" className={classes.linkButton}>
                                    IMDB
                                </a>
                            </Button>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} style={{ marginBottom: 48 }}>
                            <Typography>
                                <strong>Achievements</strong>
                            </Typography>
                            <Typography>
                                Revenue: <strong>${numeral(detail.revenue).format('0,0')}</strong>
                            </Typography>
                            <Typography>
                                Rating: <strong>{detail.rating}</strong> ({detail.voteCount} votes)
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography variant="h6" style={{ float: 'left' }}>
                                CAST
                            </Typography>
                            <Button style={{ float: 'right' }} onClick={handleOpen}>
                                see more
                            </Button>
                            <Modal
                                aria-labelledby="title"
                                aria-describedby="description"
                                className={classes.modal}
                                open={open}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <Grid container className={classes.paper}>
                                        <Grid item md={12} sm={12} xs={12} style={{ marginBottom: 12 }}>
                                            <Toolbar style={{ padding: 0}}>
                                                <Typography variant="h5" style={{ flexGrow: 1 }}>Casts</Typography>
                                                <IconButton edge="end" color="inherit" onClick={handleClose}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Toolbar>
                                        </Grid>
                                        <Grid item md={12} sm={12} xs={12} className={classes.listWrapper} style={{ height: 400, maxHeight: '100%' }}>
                                            <GridList className={classes.list}>
                                                <Grid container style={{ width: '100%' }}>
                                                    {castModal}
                                                </Grid>
                                            </GridList>
                                        </Grid>
                                    </Grid>
                                </Fade>
                            </Modal>
                        </Grid>
                        <Grid item className={classes.listWrapper}>
                            <GridList className={classes.list}>
                                {castList}
                            </GridList>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MovieDetail;