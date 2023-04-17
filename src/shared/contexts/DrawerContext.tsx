/* eslint-disable no-undef */
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface IDrawerContextData {
  isDrawerOpen: true | false;
  toggleDrawerOpen: () => void;
}

interface IAppThemeProviderChildren {
  children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IAppThemeProviderChildren> = ({
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
