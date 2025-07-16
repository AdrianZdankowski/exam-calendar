import {createContext, useContext, useState} from 'react';
import { getAccessToken, setTokens, deleteTokens } from '../lib/auth';

interface AuthContextType {
    accessToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());

    const login = (accessToken: string, refreshToken: string) => {
        setTokens(accessToken, refreshToken);
        setAccessToken(accessToken);
    };

    const logout = () => {
        deleteTokens();
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{accessToken, login, logout, isAuthenticated: !!accessToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
}