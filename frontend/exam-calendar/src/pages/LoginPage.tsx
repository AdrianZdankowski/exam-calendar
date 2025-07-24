import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../contexts/AuthContext";

interface LocationState {
    registered?: boolean;
}


const LoginPage = () => {

    const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,32}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    const USERNAME_ERROR_TEXT = "Username must contain 3-32 letters, numbers, hyphens, dots and underscores";
    const PASSWORD_ERROR_TEXT = "Password has to be at least 8 character long, contain a number and a special character";
    const LOGIN_ERROR_TEXT = "Wrong username or password given!";
    const REGISTER_SUCCESS = "Account created! Sign in below.";

    const { state } = useLocation() as { state?: LocationState };
    const navigate = useNavigate();

    const { login } = useAuth();

    const [showAlert, setShowAlert] = useState<boolean>(
        () => !!state?.registered
    );

    useEffect(() => {
        if (state?.registered) {
            navigate('.',{replace: true, state: {} });
        }
    }, []);

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);

    const [usernameError,setUsernameError] = useState('');
    const [passwordError,setPasswordError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

       const usernameErr = USERNAME_REGEX.test(username) ? '' : USERNAME_ERROR_TEXT;
       const passwordErr = PASSWORD_REGEX.test(password) ? '' : PASSWORD_ERROR_TEXT;

       setUsernameError(usernameErr);
       setPasswordError(passwordErr);

       if (usernameErr.length != 0 || passwordErr.length != 0) {
        setLoginFailed(true);
        return;
       }

       try {
        const result = await api.post('/auth/login', {username, password});
        const {accessToken, refreshToken} = result.data;
        login(accessToken, refreshToken);
        navigate('/', {
            replace: true
        })
       } 
       catch (error) {
        console.error(error);
       }
    }

    return (
        <Container maxWidth="xs" sx={{ marginTop: 10 }}>
        <Paper elevation={10} sx={{ marginTop: 8, padding: 2, backgroundColor: "hsla(220, 35%, 3%, 0.4)", color:'whitesmoke' }}>
            
            {showAlert && 
            <Alert variant="filled" 
            severity="success" 
            onClose={() => setShowAlert(false)} 
            sx={{mb: 2}}>{REGISTER_SUCCESS}
            </Alert>}

            <Typography component="h1" variant="h5" align="center">
                Sign in
            </Typography>
            {loginFailed && <Alert variant="filled" severity="error">{LOGIN_ERROR_TEXT}</Alert>}
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
