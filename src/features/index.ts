import authReducer, { logIn, logOut } from "./auth-slice";
import collapseReducer, { setCollapse, toggleCollapse } from "./collapse-slice";
import themeReducer, {
  toggleTheme,
  setTheme,
  setBgImage,
  setPrimaryColor,
  setBgColor,
} from "./theme-slice";

export {
  logIn,
  logOut,
  authReducer,
  setCollapse,
  toggleCollapse,
  collapseReducer,
  setTheme,
  toggleTheme,
  setBgImage,
  setPrimaryColor,
  setBgColor,
  themeReducer,
};
