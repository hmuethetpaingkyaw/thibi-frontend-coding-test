import { INavBar } from './NavBar';
import layoutConfig from '@/config/layoutConfig';

const base: INavBar = {
  logo: layoutConfig.logo,
  menuItems : layoutConfig.navBar.menuItems,
  bgColor: layoutConfig.navBar.bgColor,
  textColor: layoutConfig.navBar.textColor
};

export const mockNavBarProps = {
  base,
};
