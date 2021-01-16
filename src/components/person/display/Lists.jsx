import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    card: {
        position: 'relative',
        borderRadius: '50%',
        width: 100,
        height: 100,
        margin: 4,
        padding: 0
    },
    profile: {
        display: 'block',
        height: 100
    }
}));

const Lists = ({ item }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} component={Link} to={`/person/${item.id}`}>
            <CardMedia
                component="img"
                image={item.profile}
                title={item.name}
                className={classes.profile}
            />
        </Card>
    );
};

export default Lists;