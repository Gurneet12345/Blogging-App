import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Alert from './Alert';
import useLocalStorage from '../hooks/useLocalStorage';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
    'Tech',
    'News',
    'Sports',
    'Science'
];

const CreateBlog = () => {
    const [currentUser, setCurrentUser] = useLocalStorage('current_user', null); // Get the current user
    const [blogInfo, setBlogInfo] = useState({
        userId: currentUser?.uid || "", // Associate the blog with the current user
        title: "", // Default values to avoid controlled/uncontrolled warning
        description: "",
        category: "",
        image: ""
    });
    const blogCollectionReference = collection(db, "blogs"); // Reference to Firestore "blogs" collection
    const [alertConfig, setAlertConfig] = useState({});
    const navigate = useNavigate(); // For navigation after successful blog creation

    // Handle blog creation and save to Firestore
    const handleCreateBlog = async () => {
        // Check if the user is authenticated
        if (!currentUser) {
            setAlertConfig({
                message: "You need to sign in to create a blog",
                color: "error",
                isOpen: true
            });
            return;
        }

        // Create the blog in Firestore
        try {
            await addDoc(blogCollectionReference, blogInfo);
            setAlertConfig({
                message: 'Successfully Created a blog',
                color: 'success',
                isOpen: true
            });

            // Redirect to "View Blogs" after 2 seconds
            setTimeout(() => navigate("/viewblogs"), 2000);
        } catch (error) {
            setAlertConfig({
                message: 'There was an error creating the blog',
                color: 'error',
                isOpen: true
            });
        }
    };

    // Handle category selection for the blog
    const handleCategoryClick = (category) => {
        setBlogInfo({ ...blogInfo, category });
    };

    return (
        <Box 
            border="1px solid black" 
            padding="50px" 
            borderRadius="12px" 
            display="flex" 
            flexDirection="column" 
            gap="20px"
        >
            <Typography variant="h3">Create your own Blogs</Typography>
            <TextField
                style={{ color: 'white' }}
                type="text"
                placeholder="Enter Blog Title here!"
                value={blogInfo.title} // Controlled value
                onChange={(e) => setBlogInfo({ ...blogInfo, title: e.target.value })}
            />
            <TextField
                type="text"
                placeholder="Enter Blog Description here!"
                value={blogInfo.description} // Controlled value
                onChange={(e) => setBlogInfo({ ...blogInfo, description: e.target.value })}
            />
            <Box display="flex" gap="4px">
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        variant="outlined"
                        onClick={() => handleCategoryClick(category)}
                    />
                ))}
            </Box>
            <TextField
                type="text"
                placeholder="Please Paste url of the image"
                value={blogInfo.image} // Controlled value
                onChange={(e) => setBlogInfo({ ...blogInfo, image: e.target.value })}
            />
            <Button variant="contained" onClick={handleCreateBlog}>
                Create Blog
            </Button>
            <Alert alertConfig={alertConfig} />
            <Link to="/viewblogs">View Blogs</Link>
        </Box>
    );
};

export default CreateBlog;
