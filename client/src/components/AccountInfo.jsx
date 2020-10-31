import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAlbums, updateProfile, addAlbum } from '../redux/actions';
import AlbumGrid from './AlbumGrid';
import AlbumCard from './AlbumCard';

function SongItem({ handleSongInput, index, ele }) {
    // eslint-disable-next-line
    const [count, setCount] = useState('');

    return (
        <div style={{ display: 'flex', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
                <input
                    placeholder="Song Name"
                    value={ele.name}
                    onChange={(e) => {
                        setCount((prev) => prev + 1);
                        handleSongInput(e, index, 'name');
                    }}
                />
            </div>
            <div>
                <input
                    type="Number"
                    placeholder="mm"
                    style={{
                        width: '50px',
                        margin: '0 5px'
                    }}
                    value={ele.mins}
                    onChange={(e) => {
                        setCount((prev) => prev + 1);
                        handleSongInput(e, index, 'mins');
                    }}
                />
                :
                <input
                    type="Number"
                    placeholder="ss"
                    style={{
                        width: '50px',
                        margin: '0 5px'
                    }}
                    value={ele.secs}
                    onChange={(e) => {
                        setCount((prev) => prev + 1);
                        handleSongInput(e, index, 'secs');
                    }}
                />
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#030303',
        minHeight: '100vh'
    },
    banner: {
        height: '200px',
        backgroundColor: '#111',
        position: 'relative',
        display: 'flex'
    },
    profile: {
        position: 'absolute',
        bottom: '-50px',
        display: 'flex',
        height: '150px',
        padding: '0 30px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'center',
            height: 'auto',
            left: 'calc(50% - 155px)',
            bottom: '-70px'
        }
    },
    avatar: {
        height: '100%',
        width: '150px',
        borderRadius: '50%',
        backgroundColor: 'white',
        marginRight: '8px',
        [theme.breakpoints.down('xs')]: {
            marginRight: '0',
            marginBottom: '8px'
        }
    },
    name: {
        color: 'white',
        alignSelf: 'flex-end',
        fontFamily: 'dejavu serif, sans serif'
    },
    buttonsWrapper: {
        marginLeft: 'auto',
        alignSelf: 'flex-end',
        padding: '20px 0',
        '& > button': {
            marginRight: '20px',
            background: 'whitesmoke',
            borderRadius: '4px',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer'
        },
        [theme.breakpoints.down('xs')]: {
            alignSelf: 'flex-start'
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'flex-start',
        marginTop: '10vh',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '5px'
    }
}));

function AccountInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { avatar, email, name, authToken, userAlbums } = useSelector(
        (state) => state
    );

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [newName, setNewName] = useState(name);
    const [year, setYear] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [genre, setGenre] = useState('');
    const [songsList, setSongsList] = useState([
        { name: '', mins: '', secs: '' }
    ]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    useEffect(() => {
        if (authToken && userAlbums.length === 0) {
            dispatch(getUserAlbums(authToken, email));
        }
        // eslint-disable-next-line
    }, []);

    function handleProfileSubmit(e) {
        e.preventDefault();
        if (newName !== name) {
            dispatch(updateProfile(authToken, { newName, email }));
            handleClose();
        }
    }

    function handleAlbumSubmit(e) {
        e.preventDefault();
        dispatch(
            addAlbum(authToken, {
                name: albumName,
                year,
                genre,
                artist: name,
                email,
                songs: songsList
            })
        );
        setAlbumName('');
        setYear('');
        setGenre('');
        setSongsList([{ name: '', mins: '', secs: '' }]);
        handleClose1();
    }

    function handleAddSongInput(e) {
        setSongsList((prevState) => [
            ...prevState,
            { name: '', mins: '', secs: '' }
        ]);
    }

    function handleSongInput(e, index, key) {
        setSongsList((prevState) => {
            prevState[index][key] = e.target.value;
            return prevState;
        });
    }

    return (
        <div className={classes.root}>
            <div className={classes.banner}>
                <div className={classes.profile}>
                    <img className={classes.avatar} src={avatar} alt="" />
                    <h1 className={classes.name}>{name}</h1>
                </div>
                <div className={classes.buttonsWrapper}>
                    <button onClick={handleOpen}>Edit Profile</button>
                    <button onClick={handleOpen1}>Add Album</button>
                    <Modal
                        aria-labelledby="edit profile"
                        aria-describedby="edit profile"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <h2>Edit Profile</h2>
                                <form
                                    style={{
                                        paddingTop: '15px',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    onSubmit={handleProfileSubmit}
                                >
                                    <TextField
                                        label="Artist Name"
                                        variant="outlined"
                                        style={{ marginBottom: '25px' }}
                                        value={newName}
                                        onChange={(e) =>
                                            setNewName(e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        style={{ marginBottom: '25px' }}
                                        value={email}
                                        disabled
                                    />
                                    <input
                                        type="submit"
                                        value="Save"
                                        style={{
                                            marginBottom: '15px',
                                            backgroundColor: '#689F38',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            padding: '4px 0',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <input
                                        type="button"
                                        value="Cancel"
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            padding: '4px 0',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            setNewName(name);
                                            handleClose();
                                        }}
                                    />
                                </form>
                            </div>
                        </Fade>
                    </Modal>
                    <Modal
                        aria-labelledby="add album"
                        aria-describedby="add album"
                        className={classes.modal}
                        open={open1}
                        onClose={handleClose1}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500
                        }}
                    >
                        <Fade in={open1}>
                            <div className={classes.paper}>
                                <h2>Add Album</h2>
                                <form
                                    style={{
                                        paddingTop: '15px',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    onSubmit={handleAlbumSubmit}
                                >
                                    <TextField
                                        label="Albumn Name"
                                        variant="outlined"
                                        style={{ marginBottom: '25px' }}
                                        value={albumName}
                                        onChange={(e) =>
                                            setAlbumName(e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Year"
                                        variant="outlined"
                                        style={{ marginBottom: '25px' }}
                                        value={year}
                                        onChange={(e) =>
                                            setYear(e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Genre"
                                        variant="outlined"
                                        style={{ marginBottom: '25px' }}
                                        value={genre}
                                        onChange={(e) =>
                                            setGenre(e.target.value)
                                        }
                                    />
                                    <h3 style={{ marginBottom: '8px' }}>
                                        Songs
                                    </h3>
                                    <div
                                        id="songs-list"
                                        style={{
                                            maxHeight: '200px',
                                            overflowY: 'auto'
                                        }}
                                    >
                                        {songsList.map((ele, index) => (
                                            <SongItem
                                                key={index}
                                                handleSongInput={
                                                    handleSongInput
                                                }
                                                index={index}
                                                ele={ele}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            position: 'relative',
                                            border: '1px solid gray',
                                            margin: '30px 20px'
                                        }}
                                    >
                                        <button
                                            style={{
                                                border: 'none',
                                                height: '34px',
                                                width: '34px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'absolute',
                                                left: 'calc(50% - 17px)',
                                                bottom: '-17px',
                                                background: 'cyan',
                                                cursor: 'pointer'
                                            }}
                                            type="button"
                                            onClick={handleAddSongInput}
                                        >
                                            <AddIcon />
                                        </button>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Save"
                                        style={{
                                            marginBottom: '15px',
                                            backgroundColor: '#689F38',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            padding: '4px 0',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <input
                                        type="button"
                                        value="Cancel"
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            padding: '4px 0',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            handleClose1();
                                        }}
                                    />
                                </form>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
            <AlbumGrid none={'none'}>
                {userAlbums.map((album) => (
                    <AlbumCard key={album.name + album.year} album={album} />
                ))}
            </AlbumGrid>
        </div>
    );
}

export default AccountInfo;
