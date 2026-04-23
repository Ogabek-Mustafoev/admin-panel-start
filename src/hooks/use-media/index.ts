import {useState, useEffect} from 'react';

export function useMatchMedia(minWidth: number): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const query = `(min-width: ${minWidth}px)`;
    const media = window.matchMedia(query);

    const listener = () => {
      setMatches(media.matches);
    };
    listener();

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [minWidth]);

  return matches;
}
