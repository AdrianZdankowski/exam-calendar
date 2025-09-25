import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios';

const RegisterPage = () => {

    const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,32}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    const USERNAME_ERROR_TEXT = "Username must contain 3-32 letters, numbers, hyphens, dots and underscores";
    const PASSWORD_ERROR_TEXT = "Password has to be at least 8 character long, contain a number and a special character";
    const REPEAT_PASSWORD_ERROR_TEXT = "Passwords are not identical";

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [repeatPassword,setRepeatPassword] = useState('');

    const [usernameError,setUsernameError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [repeatPasswordError,setRepeatPasswordError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRegisterError('');
        

       const usernameErr = USERNAME_REGEX.test(username) ? '' : USERNAME_ERROR_TEXT;
       const passwordErr = PASSWORD_REGEX.test(password) ? '' : PASSWORD_ERROR_TEXT;
       const repeatPasswordErr = password === repeatPassword ? '' : REPEAT_PASSWORD_ERROR_TEXT;

       setUsernameError(usernameErr);
       setPasswordError(passwordErr);
       setRepeatPasswordError(repeatPasswordErr);

       if (usernameErr.length != 0 || passwordErr.length != 0 || repeatPasswordErr.length != 0) return;

       try {
        await api.post('/auth/register', {username, password});
        navigate('/login', {
            replace: true,
            state: {
                registered: true,
            }
            });
       }
       catch (error: any) {
        console.error(error);
        if (error.response?.status === 400) {
            setRegisterError("User with given name already exists!");
        }
        else {
            setRegisterError("There was an error during registration. Try again.");
        }
       }
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: 10 }}>
        <Paper elevation={10} sx={{ marginTop: 8, padding: 2, backgroundColor: "hsla(220, 35%, 3%, 0.4)", color:'whitesmoke' }}>
            {registerError && 
            <Alert variant="filled" severity="error">{registerError}</Alert>}

            <Typography component="h1" variant="h5" align="center">
                Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
                <TextField 
                fullWidth
                label="Username"
                type="text"
                value={username} 
                onChange={(e) => {setUsername(e.target.value); setUsernameError('');}}
                placeholder="Enter username" 
                error={!!usernameError}
                helperText={usernameError}
                autoFocus 
                required 
                sx={{
                mb: 2,
                input: { color: 'whitesmoke' },
                '& .MuiInputLabel-root': { color: 'whitesmoke' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'whitesmoke' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                }}/>
                
                <TextField 
                fullWidth
                label="Password"
                type="password"
                value={password} 
                onChange={(e) => {setPassword(e.target.value); setPasswordError('');}}
                placeholder="Enter password" 
                error={!!passwordError}
                helperText={passwordError}
                required 
                sx={{
                mb: 2,
                input: { color: 'whitesmoke' },
                '& .MuiInputLabel-root': { color: 'whitesmoke' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'whitesmoke' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                }}/>
                

                <TextField 
                fullWidth
                label="Repeat password"
                type="password"
                value={repeatPassword} 
                onChange={(e) => {setRepeatPassword(e.target.value); setRepeatPasswordError('')}}
                placeholder="Repeat password" 
                error={!!repeatPasswordError}
                helperText={repeatPasswordError}
                required 
                sx={{
                mb: 2,
                input: { color: 'whitesmoke' },
                '& .MuiInputLabel-root': { color: 'whitesmoke' },
                '& .MuiInputLabel-root.Mui-focused': { color: 'whitesmoke' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'whitesmoke' },
                }}/>

                <Button type="submit" variant="contained" fullWidth sx={{mb: 2, mt: 2}}>
                    Sign up
                </Button>

                <Box
                sx={{textAlign: "center"}}>
                    <Link className="clean-link" to="/login">SIGN IN</Link>
                </Box>
                
            
            </Box>
        </Paper>
        </Container>
    );
    };

export default RegisterPage;
