import { PropsWithChildren } from "react";
import MainNavigation from "./MainNavigation";

import styles from "./Layout.module.css";

const Layout: React.FC<PropsWithChildren> = (props) => (
  <>
    <MainNavigation />
    <main className={styles.main}>{props.children}</main>
  </>
);

export default Layout;
