import { UrlObject } from "url";

import Link from "next/link";
import { useContext } from "react";

import { NAV_BAR_LINKS, ROUTES, ROUTE } from "../../constants/routes";
import NavItem from "../NavItem/NavItem";
import { ColorScheme } from "../../contexts/colorScheme";
import { COLOR_SCHEME } from "../../hooks/useColorScheme";

import styles from "./Navbar.module.scss";

interface INavbarProps {
  className?: string;
}

const Navbar = ({ className }: INavbarProps) => {
  const { colorScheme, setColorScheme } = useContext(ColorScheme);
  const isDarkColorScheme = colorScheme === COLOR_SCHEME.dark;

  const rootStyles = [styles.root];
  if (className) rootStyles.push(className);
  return (
    <div className={rootStyles.join(" ")}>
      <Link href={ROUTES.get(ROUTE.home)?.url as UrlObject} passHref>
        <a>
          <h1 className={styles.title}>
            Do!! You!!!<span className={styles.trackId}> Track ID</span>
          </h1>
        </a>
      </Link>
      <nav className={styles.nav}>
        {NAV_BAR_LINKS.map(({ url, label }) => (
          <Link href={url} passHref key={label}>
            <NavItem>{label}</NavItem>
          </Link>
        ))}
        <NavItem
          onClick={() =>
            setColorScheme(
              isDarkColorScheme ? COLOR_SCHEME.light : COLOR_SCHEME.dark
            )
          }
        >
          {isDarkColorScheme ? "Light" : "Dark"}
        </NavItem>
      </nav>
    </div>
  );
};

export default Navbar;
