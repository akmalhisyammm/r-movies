import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    cardWrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: 4,
        textDecoration: 'none',
        color: 'inherit'
    },
    card: {
        position: 'relative',
        borderRadius: '50%',
        width: 75,
        height: 75,
        marginRight: 18
    },
    profile: {
        display: 'block',
        height: 75
    }
}));

const Modals = ({ item }) => {
    const classes = useStyles();

    return (
        <Grid item sm={12} xs={12} className={classes.cardWrapper} component={Link} to={`/person/${item.id}`}>
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    image={item.profile}
                    title={item.name}
                    className={classes.profile}
                />
            </Card>
            <Typography>
                {item.name}
            </Typography>
        </Grid>
    );
};

export default Modals;