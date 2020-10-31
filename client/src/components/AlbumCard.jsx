import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        textAlign: 'center',
        color: 'whitesmoke',
        background: 'transparent',
        borderRadius: '5px'
    }
}));

function AlbumCard({
    album,
    style,
    fontSizeTitle,
    fontSizeArtist,
    fontSizeCount,
    alignContent,
    wrap
}) {
    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        history.push({ pathname: `/album/${album._id}`, state: album });
    }

    return (
        <Grid item xs={12} sm={4} lg={2}>
            <Paper className={classes.paper} style={style}>
                <img
                    style={{
                        height: 'auto',
                        maxWidth: '100%',
                        background: '#333',
                        borderRadius: '5px'
                    }}
                    src={album.albumArt}
                    alt=""
                />
                <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <Typography
                        noWrap={wrap === false ? false : true}
                        variant="h6"
                        style={{
                            textAlign: alignContent || 'left',
                            fontSize: fontSizeTitle
                        }}
                    >
                        {album.name}
                    </Typography>
                    <Typography
                        style={{
                            textAlign: alignContent || 'left',
                            color: 'grey',
                            fontSize: fontSizeArtist
                        }}
                    >
                        {album.artist} • {album.year}
                    </Typography>
                    <Typography
                        style={{
                            textAlign: alignContent || 'left',
                            color: 'grey',
                            fontSize: fontSizeCount
                        }}
                    >
                        {album.songs.length} Songs
                    </Typography>
                </div>
            </Paper>
        </Grid>
    );
}

export default AlbumCard;
