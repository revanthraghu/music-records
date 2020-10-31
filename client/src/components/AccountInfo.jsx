import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAlbums, updateProfile } from '../redux/actions';

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
        padding: '0 30px'
    },
    avatar: {
        height: '100%',
        width: '150px',
        borderRadius: '50%',
        backgroundColor: 'white',
        marginRight: '8px'
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
    const [newName, setNewName] = useState(name);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (authToken && userAlbums.length === 0) {
            //dispatch(getUserAlbums(authToken, email));
        }
    }, []);

    function handleProfileSubmit(e) {
        e.preventDefault();
        if (newName !== name) {
            dispatch(updateProfile(authToken, { newName, email }));
        }
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
                    <button>Add Album</button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
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
                                            borderRadius: '4px'
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
                                            borderRadius: '4px'
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
                </div>
            </div>
        </div>
    );
}

export default AccountInfo;
