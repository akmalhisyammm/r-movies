import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    cardWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: 4,
        textDecoration: 'none',
        color: 'inherit'
    },
    avatar: {
        width: 75,
        height: 75,
        marginRight: 18
    }
}));

const Modals = ({ item }) => {
    const classes = useStyles();

    return (
        <Grid item sm={12} xs={12} className={classes.cardWrapper} component={Link} to={`/person/${item.id}`}>
            <Avatar alt={item.name} src={item.profile} className={classes.avatar} />
            <Typography>
                {item.name}
            </Typography>
        </Grid>
    );
};

export default Modals;