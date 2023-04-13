import { useEffect, useState } from "react";
import { Div } from "../containers";
import { Switch } from "../themeSwitch";
import styles from "./navbar.module.css";
import Link from "next/link";

export const Navbar = ({ user, setUser }: any) => {
  const [match, setMatch] = useState(true);
  const [open, setIsOpen] = useState(true);
  const resizedWindow = (x: any) => {
    setIsOpen(x.matches);
    setMatch(x.matches);
  };
  useEffect(() => {
    const x = window.matchMedia("(min-width: 500px)");
    resizedWindow(x);
    x.addEventListener("change", resizedWindow);
  }, []);

  const AdminRoutes = () => {
    if (!user || user.user_role === "student") {
      return <></>;
    }
    return (
      <>
        <li className={styles["item"]}>
          <Link className={styles["link-a"]} href='/admin/rentals'>
            Rentals
          </Link>
        </li>
        <li className={styles["item"]}>
          <Link className={styles["link-a"]} href='/admin/books'>
            Books
          </Link>
        </li>
        <li className={styles["item"]}>
          <Link className={styles["link-a"]} href='/admin/users'>
            Users
          </Link>
        </li>
      </>
    );
  };
  const UserRoutes = () => {
    if (!user) {
      return <></>;
    }
    return (
      <>
        <li className={styles["item"]}>
          <Link className={styles["link-a"]} href='/'>
            Home
          </Link>
        </li>
        <li className={styles["item"]}>
          <Link className={styles["link-a"]} href='/my-books'>
            My books
          </Link>
        </li>
      </>
    );
  };

  const SessionButton = () => {
    if (!user) {
      return (
        <Link className={styles["link-a"]} style={{ paddingRight: "2vw" }} href='/login'>
          Login
        </Link>
      );
    }
    return (
      <Link
        className={styles["link-a"]}
        style={{ paddingRight: "2vw" }}
        href={"/login"}
        onClick={() => {
          setUser(null);
          localStorage.clear();
        }}>
        Logout
      </Link>
    );
  };
  return (
    <nav className={styles["nav"]}>
      <Div row space='between'>
        <Div space='between' fit className={`${styles[open ? "show" : "hide"]}`}>
          <ul className={`${styles["list"]} ${styles[match ? "row" : "column"]}`}>
            <UserRoutes />
            <AdminRoutes />
          </ul>
        </Div>
        <Div space='between' row fit className={styles["right"]}>
          <SessionButton />
          <Switch />
          <svg
            onClick={() => setIsOpen((prev) => !prev)}
            className={`${styles["hamburguer"]}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            fill='currentColor'>
            <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
          </svg>
        </Div>
      </Div>
    </nav>
  );
};
