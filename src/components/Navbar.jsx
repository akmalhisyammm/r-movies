import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 32
    },
    container: {
        paddingLeft: 0,
        paddingRight: 0
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'inherit',
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const classes = useStyles();

    return (
        <AppBar position="static" color="transparent" className={classes.root}>
            <Container maxWidth="md" className={classes.container}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title} component={Link} to={'/'}>
                        R-Movies
                    </Typography>
                    <IconButton color="inherit" aria-label="search" component={Link} to={'/movie/search'}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit">
                        <DarkModeSwitch 
                            checked={darkMode}
                            onChange={toggleDarkMode}
                            size={22.5}
                        />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;