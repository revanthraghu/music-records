import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../redux/actions';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://revanthraghu.github.io">
                Revanth Raghu
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '320px'
        },
        [theme.breakpoints.up('sm')]: {
            width: '360px'
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'red'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        position: 'relative'
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    appIcon: {
        borderRadius: '50%',
        border: '2px solid white',
        backgroundColor: '#ff0000',
        padding: '5px',
        height: '35px',
        width: '35px'
    }
}));

function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('gr@gmail.com');
    const [password, setPassword] = useState('123456');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postLogin({ email, password }));
    };

    useEffect(() => {
        setOpen(true);
    }, [setOpen, error]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div
            style={{
                backgroundImage: "url('landing_page_bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container
                classes={{ root: classes.root }}
                style={{
                    backgroundColor: 'white',
                    paddingBottom: '25px',
                    borderRadius: '10px'
                }}
                component="main"
                maxWidth="xs"
            >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <MusicNoteIcon className={classes.appIcon} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in to Shuttle+
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs></Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            style={{
                                position: 'absolute',
                                bottom: '-30px',
                                width: '100%'
                            }}
                        >
                            <div
                                style={{
                                    color: 'red',
                                    textAlign: 'center'
                                }}
                            >
                                {error}
                            </div>
                        </Snackbar>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}

export default Login;
