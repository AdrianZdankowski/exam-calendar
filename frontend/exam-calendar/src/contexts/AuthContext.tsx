import {createContext, useContext, useState} from 'react';
import { getAccessToken, setTokens, deleteTokens } from '../lib/auth';
import { decodeUserRole } from '../lib/decodeUserRole';

interface AuthContextType {
    accessToken: string | null;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    userRole?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
    const [userRole, setUserRole] = useState<string | undefined>();

    const login = (accessToken: string, refreshToken: string) => {
        setTokens(accessToken, refreshToken);
        setAccessToken(accessToken);
        setUserRole(decodeUserRole(accessToken));
    };

    const logout = () => {
        deleteTokens();
        setAccessToken(null);
        setUserRole(undefined);
    };

    return (
        <AuthContext.Provider value={{accessToken, login, logout, isAuthenticated: !!accessToken, userRole}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
}