import React from 'react';
import { useAuth } from '@frontend-kit/hooks';

export const P: React.FC = () => {
    const { user } = useAuth();

  return (
    <p>Юзер: {user}</p>
  );
};
