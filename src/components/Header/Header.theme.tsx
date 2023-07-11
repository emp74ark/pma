import { closeOffcanvas, toggleTheme } from '../../redux/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const ThemeSelector = () => {
  const dispatch = useDispatch();
  const {
    setting: { theme },
  } = useSelector((state: RootState) => state);

  const themeToggler = () => {
    const value = theme === 'light' ? 'dark' : 'light';
    dispatch(toggleTheme(value));
    dispatch(closeOffcanvas());
  };

  return <div className="bi-circle-half fs-4" role="button" onClick={themeToggler}></div>;
};
