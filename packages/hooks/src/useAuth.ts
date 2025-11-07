import { useState, useCallback } from 'react';

export const useAuth = () => {
  console.log('useAuth hook called');

  return { user: 'user' };
};