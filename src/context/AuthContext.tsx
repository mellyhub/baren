import { createContext, useContext, FC, ReactNode } from 'react';
import { Auth0Provider, Auth0ProviderOptions, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  loginWithRedirect: (options?: { authorizationParams?: { connection?: string } }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || '/');
  };

  if (!import.meta.env.VITE_AUTH0_DOMAIN || !import.meta.env.VITE_AUTH0_CLIENT_ID) {
    throw new Error('Missing Auth0 configuration. Please check your environment variables.');
  }

  const config: Auth0ProviderOptions = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
    onRedirectCallback,
  };

  return (
    <Auth0Provider {...config}>
      <AuthProviderContent>{children}</AuthProviderContent>
    </Auth0Provider>
  );
};

const AuthProviderContent: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect: auth0LoginWithRedirect,
    logout: auth0Logout,
  } = useAuth0();

  const loginWithRedirect = (options?: { authorizationParams?: { connection?: string } }) => {
    auth0LoginWithRedirect(options);
  };

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuth0Sub = (): string | undefined => {
  const { user } = useAuth();
  return user?.sub;
};

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return <>{children}</>;
}; 