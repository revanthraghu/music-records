import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '30px',
        background: '#030303',
        minHeight: '100vh'
    }
}));

function Home() {
    const classes = useStyles();
    return <div className={classes.root}></div>;
}

export default Home;
