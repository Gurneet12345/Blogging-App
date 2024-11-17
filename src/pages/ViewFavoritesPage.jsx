import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import useLocalStorage from '../hooks/useLocalStorage';
import BlogCard from '../components/BlogCard';
import { Box, Typography, Divider } from '@mui/material';



const ViewFavoritesPage = () => {
    // State to hold the list of favorite blogs
    const [favoritesList, setFavoritesList] = useState([]);
    // Get the current user's information from local storage
    const [currentUser] = useLocalStorage('current_user', null);

    // Fetch favorite blogs for the logged-in user
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!currentUser) return;

            try {
                // Query the "favorites" collection for blogs belonging to the current user
                const favoritesQuery = query(
                    collection(db, 'favorites'),
                    where('userId', '==', currentUser.uid)
                );

                // Retrieve the query snapshot and extract the blog data
                const querySnapshot = await getDocs(favoritesQuery);
                const favorites = querySnapshot.docs.map(doc => doc.data());
                setFavoritesList(favorites);
            } catch (error) {
                console.error('Error fetching favorites:', error.message);
            }
        };

        fetchFavorites();
    }, [currentUser]);

    return (
        <Box display="flex" flexDirection="column" gap="20px">
            <Typography variant="h3">Favorite Blogs</Typography>
            <Divider />
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
                {favoritesList.map((blog, index) => (
                    <BlogCard key={index} blog={blog} showDeleteIcon={false} />
                ))}
            </Box>
        </Box>
    );
};

export default ViewFavoritesPage;
