import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Alert from '../components/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorCode } from '../utils';

const SignupPage = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [alertConfig, setAlertConfig] = useState({});
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            // Attempt user signup using Firebase Authentication
            const { user } = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
            
            // Set success alert message
            setAlertConfig({ 
                ...alertConfig, 
                message: 'Successfully Signed up', 
                color: 'success', 
                isOpen: true 
            });

            // Redirect to the home page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            // Handle errors by mapping Firebase error codes to user-friendly messages
            const message = getErrorCode(error.code);
            setAlertConfig({ 
                ...alertConfig, 
                message, 
                color: 'error', 
                isOpen: true 
            });
        }
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            gap="12px" 
            border="1px solid black" 
            padding="40px" 
            borderRadius="12px"
        >
            <Typography variant="h3">Sign up</Typography>
            <TextField
                required
                id="email"
                label="Email"
                placeholder='Enter your email'
                type='email'
                value={credentials.email} // Controlled input
                onChange={(e) => setCredentials({
                    ...credentials,
                    email: e.target.value
                })}
            />
            <TextField
                required
                id="password"
                label="Password"
                placeholder='Enter your Password'
                type='password'
                value={credentials.password} // Controlled input
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })}
            />
            <Button 
                onClick={handleSignup} 
                variant="contained" 
                color="secondary"
            >
                Sign up
            </Button>
            <Alert alertConfig={alertConfig} />
            <Link to="/">Already have an account? Signin</Link>
        </Box>
    );
};

export default SignupPage;
