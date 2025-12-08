import { useState, useCallback } from 'react';

export const useAuth = () => {
  console.log('useAuth hook called');
  console.log('useAuth hook called11');
  console.log('useAuth hook called22');

  return { user: 'user' };
};
