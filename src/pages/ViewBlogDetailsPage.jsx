import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import BlogCard from '../components/BlogCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';

const ViewBlogDetailsPage = () => {
    const { id } = useParams(); // Get the blog ID from the URL parameters
    const [blogData, setBlogData] = useState({}); // State to hold the blog data
    const [currentUser] = useLocalStorage('current_user', null);

    useEffect(() => {
        const getBlogData = async () => {
            // Fetch the specific blog document by ID from Firestore
            const snap = await getDoc(doc(db, 'blogs', id));
            if (snap.exists()) {
                console.log(snap.data(), 'snap.data()'); // Log the fetched data for debugging
                setBlogData(snap.data()); // Update the blogData state with fetched data
            }
        };

        getBlogData(); // Call the function to fetch blog data
    }, [id]); // Dependency array ensures this runs when the `id` changes

    const markAsFavorite = async () => {
        if (!currentUser) return;
        const favoriteDoc = doc(db, 'favorites', `${currentUser.uid}_${id}`);
        await setDoc(favoriteDoc, { ...blogData, userId: currentUser.uid });
    };

    return (
        <div>
            <BlogCard blog={blogData} showDeleteIcon={false} />
            <IconButton onClick={markAsFavorite}>
                <FavoriteIcon color="error" />
            </IconButton>
        </div>
    );
};

export default ViewBlogDetailsPage;
