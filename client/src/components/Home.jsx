import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AlbumGrid from './AlbumGrid';
import AlbumCard from './AlbumCard';
import { useSelector, useDispatch } from 'react-redux';
import { getAlbums } from '../redux/actions';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root2: {
        padding: '30px',
        [theme.breakpoints.down('xs')]: {
            padding: '10px'
        },
        background: '#030303',
        minHeight: '100vh'
    },
    root: {
        padding: '0 50px',
        '& .MuiPaginationItem-root': {
            color: '#fff'
        }
    }
}));

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    let {
        albums,
        main_total_count,
        main_current_page,
        sort,
        filter
    } = useSelector((state) => state);

    const [count, setCount] = useState(0);

    useEffect(() => {
        dispatch(getAlbums());
        setCount(
            albums.filter((ele) =>
                filter === 'default' ? ele : ele.genre === filter
            ).length
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setCount(
            albums.filter((ele) =>
                filter === 'default' ? ele : ele.genre === filter
            ).length
        );
    }, [filter]);

    function handlePageChange(page) {
        if (page !== main_current_page) {
            dispatch(getAlbums(page));
        }
    }

    return (
        <div className={classes.root2}>
            <AlbumGrid style={{ paddingTop: '20px', paddingBottom: '30px' }}>
                {albums
                    .filter((ele) =>
                        filter === 'default' ? ele : ele.genre === filter
                    )
                    .sort((a, b) => {
                        if (sort === 'Old to New') {
                            return Number(a.year) - Number(b.year);
                        }
                        return Number(b.year) - Number(a.year);
                    })
                    .map((album) => (
                        <AlbumCard
                            key={album.name + album.year}
                            album={album}
                        />
                    ))}
            </AlbumGrid>
            <Pagination
                className={classes.root}
                count={
                    Math.ceil(
                        filter === 'default' ? main_total_count / 6 : count / 6
                    ) || 1
                }
                color="secondary"
                page={Number(main_current_page)}
                onChange={(e, page) => handlePageChange(page)}
            />
        </div>
    );
}

export default Home;
