import authReducer, {logIn, logOut} from './auth-slice';
import themeReducer, {toggleTheme, setTheme} from './theme-slice';
import collapseReducer, {setCollapse, toggleCollapse} from './collapse-slice';

export {
  logIn,
  logOut,
  authReducer,

  setCollapse,
  toggleCollapse,
  collapseReducer,

  setTheme,
  toggleTheme,
  themeReducer,
}
