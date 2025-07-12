import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

       const usernameErr = USERNAME_REGEX.test(username) ? '' : USERNAME_ERROR_TEXT;
       const passwordErr = PASSWORD_REGEX.test(password) ? '' : PASSWORD_ERROR_TEXT;
       const repeatPasswordErr = password === repeatPassword ? '' : REPEAT_PASSWORD_ERROR_TEXT;

       setUsernameError(usernameErr);
       setPasswordError(passwordErr);
       setRepeatPasswordError(repeatPasswordErr);

       if (usernameErr.length != 0 || passwordErr.length != 0 || repeatPasswordErr.length != 0) return;

       console.log(`Username: ${username} Password: ${password} RPass: ${repeatPassword}`);
    }

    return (
        <Container maxWidth="xs" sx={{ marginTop: 10 }}>
        <Paper elevation={10} sx={{ marginTop: 8, padding: 2, backgroundColor: "hsla(220, 35%, 3%, 0.4)", color:'whitesmoke' }}>
            <Typography component="h1" variant="h5" align="center">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
                <TextField 
                fullWidth
                label="Username"
                type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setRepeatPassword(e.target.value)}
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
                    Sign in
                </Button>

                <Box
                sx={{textAlign: "center"}}>
                    <Link className="clean-link" to="/register">SIGN UP</Link>
                </Box>
                
            
            </Box>
        </Paper>
        </Container>
    );
    };

export default LoginPage;
