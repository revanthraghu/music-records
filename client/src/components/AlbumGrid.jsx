import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { setSort, setFilter } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '100px 50px'
    },
    option1: {
        marginRight: '20px',
        [theme.breakpoints.down('xs')]: {
            marginRight: '0',
            marginBottom: '10px'
        }
    },
    option2: {
        [theme.breakpoints.down('xs')]: {
            marginRight: '0',
            marginBottom: '10px'
        }
    }
}));

function AlbumGrid(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { sort, filter } = useSelector((state) => state);
    return (
        <div className={classes.root} style={props.style}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" color="secondary" gutterBottom>
                    Albums
                </Typography>
                <div
                    style={{
                        textAlign: 'right',
                        display: props.none || 'block'
                    }}
                >
                    <select
                        style={{ width: '100px' }}
                        className={classes.option1}
                        value={filter === 'default' ? 'Select Genre' : filter}
                        onChange={(e) => dispatch(setFilter(e.target.value))}
                    >
                        <option value="default">Select Genre</option>
                        <option value="Hard Rock">Hard Rock</option>
                        <option value="Pop">Pop</option>
                        <option value="Psychedelic Rock">
                            Psychedelic Rock
                        </option>
                    </select>
                    <select
                        onChange={(e) => dispatch(setSort(e.target.value))}
                        style={{ width: '100px' }}
                        className={classes.option2}
                        value={sort === 'default' ? 'Sort' : sort}
                    >
                        <option value="default">Sort</option>
                        <option value="Old to New">Old to New</option>
                        <option value="New to Old">New to Old</option>
                    </select>
                </div>
            </div>
            <Grid container spacing={3}>
                {props.children}
            </Grid>
        </div>
    );
}

export default AlbumGrid;
