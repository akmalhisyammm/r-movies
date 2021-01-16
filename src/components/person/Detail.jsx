import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Container, Grid, Card, CardMedia, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { getPersons } from '../../api';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 400,
        maxWidth: '80%',
        borderRadius: 20,
        marginBottom: 12
    },
    responsiveCenter: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }
}))

const PersonDetail = ({ match }) => {
    const classes = useStyles();

    let params = match.params;

    const [person, setPerson] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setPerson(await getPersons(params.id));
        };

        fetchAPI();
    }, [params.id]);

    let history = useHistory();

    const prevPage = () => {
        history.goBack();
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
                <Grid item md={6} sm={12} xs={12} className={classes.responsiveCenter}>
                    <Typography variant="h6" gutterBottom style={{ textTransform: 'uppercase' }}>
                        {person.name}
                    </Typography>
                    <Card className={classes.card}>
                        <CardMedia 
                            component="img"
                            image={person.profile}
                            title={person.name}
                        />
                    </Card>
                </Grid>
                <Grid item md={6} sm={12} xs={12} style={{ marginTop: 12 }}>
                    <Typography gutterBottom>
                        <strong>AGE: {moment().diff(person.birthday, 'years')} YEARS OLD</strong>
                    </Typography>
                    <Typography align="justify" style={{ marginBottom: 24 }}>
                        {person.biography}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PersonDetail;