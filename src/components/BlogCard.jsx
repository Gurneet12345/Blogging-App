/* eslint-disable react/prop-types */
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import useLocalStorage from '../hooks/useLocalStorage';

const BlogCard = (props) => {
    const { blog, deleteBlog = () => {}, showDeleteIcon = true } = props;
    // Favorites Table as well in the database

    const navigate = useNavigate();
    const [currentUser] = useLocalStorage('current_user', null);

    const markAsFavorite = async () => {
        if (!currentUser) return;
        const favoriteDoc = doc(db, 'favorites', `${currentUser.uid}_${blog.id}`);
        await setDoc(favoriteDoc, { ...blog, userId: currentUser.uid });
    };

    return (
        <Card style={{ position: 'relative' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={blog.image}
                title="green iguana"
            />
            {
                showDeleteIcon && <IconButton style={{ position: 'absolute', right: '10px', top: '5px' }} aria-label="delete" size="small" onClick={() => deleteBlog(blog.id)}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {blog.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.description}
                </Typography>
                <Chip label={blog.category} variant="outlined" />
            </CardContent>
            <CardActions>
                <Button color='success' variant='contained' onClick={markAsFavorite}>
                    <FavoriteIcon /> Favorite
                </Button>
                <Button color='secondary' variant='contained' onClick={() => navigate(`/viewblogs/${blog.id}`)}>Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
