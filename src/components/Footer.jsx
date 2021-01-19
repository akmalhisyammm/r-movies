import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/tmdb.svg';

const useStyles = makeStyles(() => ({
    container: {
        paddingTop: 24,
        paddingBottom: 24
    },
    footer: {
        display: 'flex',
        alignItems: 'center'
    },
    devCopy: {
        flexGrow: 1
    },
    powered: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    logo: {
        width: 60,
        marginBottom: 4
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container alignItems="center">
                <Grid item sm={12} xs={12} className={classes.footer}>
                    <Typography variant="body2" className={classes.devCopy}>
                        &copy; 2021 &bull; Muhammad Akmal Hisyam
                    </Typography>
                    <div className={classes.powered}>
                        <Typography variant="caption" gutterBottom>
                            Powered by
                        </Typography>
                        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
                            <img className={classes.logo} src={logo} alt="TheMovieDB"/>
                        </a>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;