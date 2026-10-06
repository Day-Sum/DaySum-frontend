import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import AuthProvider from './contexts/Auth/AuthProvider';
import { queryClient } from './QueryClient';
import router from './Router';

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
  );
};

export default App;