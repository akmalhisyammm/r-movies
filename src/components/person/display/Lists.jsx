import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    avatar: {
        width: 100,
        height: 100,
        margin: 4,
        textDecoration: 'none'
    }
}));

const Lists = ({ item }) => {
    const classes = useStyles();

    return (
        <Avatar
            alt={item.name}
            src={item.profile}
            className={classes.avatar} 
            component={Link} to={`/person/${item.id}`}
        />
    );
};

export default Lists;