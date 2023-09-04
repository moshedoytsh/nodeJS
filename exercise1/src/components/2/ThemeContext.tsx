import { createContext, useState } from "react";

type Theme = 'dark' | 'light';
 
type ThemeContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

type ThemeContextProviderType = {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeContextProvider: React.FC<ThemeContextProviderType> = (props) => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;