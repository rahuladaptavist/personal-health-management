'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

interface AuthContextType {
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
  idToken?: string;
  setAuthData: (data: AuthenticationResultType) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [idToken, setIdToken] = useState<string>();

  const setAuthData = (data: AuthenticationResultType) => {
    setAccessToken(data.AccessToken);
    setExpiresIn(data.ExpiresIn);
    setRefreshToken(data.RefreshToken);
    setIdToken(data.IdToken);
  };

  const clearAuthData = () => {
    setAccessToken(undefined);
    setExpiresIn(undefined);
    setRefreshToken(undefined);
    setIdToken(undefined);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        accessToken, 
        expiresIn, 
        refreshToken, 
        idToken,
        setAuthData,
        clearAuthData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
} 