import React, { useEffect, useState } from 'react';

export const MediaContext = React.createContext<number>(window.innerWidth);

export interface IThemeProviderProps {
  children: JSX.Element;
}
const MediaProvider = ({ children }: IThemeProviderProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  return (
    <MediaContext.Provider value={windowWidth}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
