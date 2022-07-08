import { useState, createContext } from 'react';

export const LayoutContext = createContext({
  visibleDrawer: true,
  currentDrawer: '1',
  openDrawer: () => {},
  closeDrawer: () => {},
  changeDrawer: () => {},
});

export const LayoutContextProvider = (props) => {
  const [visibleDrawer, setVisibleDrawer] = useState(true);
  const [currentDrawer, setCurrentDrawer] = useState('1');

  const openDrawer = () => {
    setVisibleDrawer(true);
  };

  const closeDrawer = () => {
    setCurrentDrawer('');
    setVisibleDrawer(false);
  };

  const changeDrawer = (drawer) => {
    setCurrentDrawer(drawer);
  };

  return (
    <LayoutContext.Provider
      value={{
        visibleDrawer,
        currentDrawer,
        openDrawer,
        closeDrawer,
        changeDrawer,
      }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
};
