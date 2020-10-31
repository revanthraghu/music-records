import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { postLogout } from '../redux/actions';

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    root: {
        flexGrow: 1
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        margin: '0 50px 0 60px',
        [theme.breakpoints.down('sm')]: {
            margin: '0 10px'
        },
        width: '100%'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%'
    },
    avatar: {
        marginRight: '10px',
        backgroundColor: 'red'
    },
    appIcon: {
        borderRadius: '50%',
        border: '2px solid white',
        backgroundColor: '#ff0000',
        padding: '5px',
        height: '30px',
        width: '30px'
    },
    appBar: {
        background: '#030303',
        borderBottom: '1px solid #222'
    },
    signInButton: {
        fontSize: 'small',
        width: '115px',
        backgroundColor: 'white',
        color: 'black'
    }
}));

function Navbar() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const authToken = useSelector((state) => state.authToken);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e, action) => {
        setAnchorEl(null);
        if (action === 'logout') {
            dispatch(postLogout());
        } else if (action === 'account') {
            history.push('/account');
        }
    };

    const handleSignIn = () => {
        history.push('/login');
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Avatar className={classes.avatar}>
                        <MusicNoteIcon className={classes.appIcon} />
                    </Avatar>
                    <Typography variant="h6" className={classes.title}>
                        Shuttle+
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {!!authToken ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                style={{ paddingRight: '0' }}
                            >
                                <AccountCircle style={{ fontSize: '40px' }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={(e) => handleClose(e, 'account')}
                                >
                                    My account
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => handleClose(e, 'logout')}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleSignIn}
                            className={classes.signInButton}
                        >
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    );
}

export default Navbar;
