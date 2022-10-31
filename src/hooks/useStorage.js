import { useState, useEffect } from 'react';

export default function useStorage(key) {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key);
    return JSON.parse(storage);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
