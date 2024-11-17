import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { getErrorCode } from '../utils';
import useLocalStorage from '../hooks/useLocalStorage';

const SignInPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [alertConfig, setAlertConfig] = useState({});
  const navigate = useNavigate();
  const [_currentUser, setCurrentUser] = useLocalStorage('current_user', null);

  // Handle user sign-in using Firebase Authentication
  const handleSignin = async () => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        setAlertConfig({ ...alertConfig, message: 'Successfully Signed in', color: 'success', isOpen: true });
        setCurrentUser(user);
        setTimeout(() => {
            navigate('/home'); // Redirect to home after successful sign-in
        }, 2000);
    } catch (error) {
      console.error("Sign-in Error:", error); // Log full error object
      const message = getErrorCode(error.code); // Map Firebase error code
      setAlertConfig({ ...alertConfig, message, color: 'error', isOpen: true });
  }
  };

  return (
    <Box display="flex" flexDirection="column" gap="12px" border="1px solid black" padding="40px" borderRadius="12px">
        <Typography variant="h3">Sign in</Typography>
         <TextField
          required
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={credentials.email} // Controlled value
          onChange={(e) => setCredentials({
            ...credentials,
            email: e.target.value
          })}
        />
         <TextField
          required
          id="password"
          label="Password"
          placeholder="Enter your Password"
          type="password"
          value={credentials.password} // Controlled value
          onChange={(e) => setCredentials({
            ...credentials,
            password: e.target.value
          })}
        />
        <Button onClick={handleSignin} variant="contained" color="secondary">Signin</Button>
        <Alert alertConfig={alertConfig} />
        <Link to="/signup">Don't have an account? Signup</Link>
    </Box>
  );
};

export default SignInPage;
