import React from 'react';
import AlbumCard from './AlbumCard';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    table: {
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '320px'
        },
        [theme.breakpoints.up('sm')]: {
            width: '650px'
        }
    },
    paper: {
        backgroundColor: 'transparent',
        [theme.breakpoints.down('xs')]: {
            width: '320px'
        },
        '& *': {
            color: 'white'
        }
    }
}));

function AlbumnInfo() {
    const location = useLocation();
    const classes = useStyles();
    return (
        <div
            style={{
                padding: '50px',
                backgroundColor: '#030303',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <AlbumCard
                album={location.state}
                fontSizeTitle={'25px'}
                fontSizeArtist={'20px'}
                fontSizeCount={'18px'}
                alignContent={'center'}
                wrap={false}
            />
            <TableContainer component={Paper} className={classes.paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {location.state.songs.map((song, index) => (
                            <TableRow key={song.name + index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{song.name}</TableCell>
                                <TableCell align="right">{`${song.mins}:${song.secs}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AlbumnInfo;
