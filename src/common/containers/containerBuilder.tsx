//@ts-ignore
import { jsx } from "react/jsx-runtime";
import styles from "./container.module.css";

const COLUMN = "column";

const containerBuilder = (HtmlElement: string, { children, column, row, className, space, fit, onClick, role }: any, extendedClass: string | undefined) => {
  let direction = COLUMN;
  if (column) direction = COLUMN;
  if (row) direction = "row";
  let width = "full-width";
  if (fit) width = "fit";

  return jsx(HtmlElement, {
    children,
    className: `${styles.container} ${styles[direction]} ${styles[space ?? "around"]} ${styles[width]} ${className ? " " + className : ""}${
      extendedClass ? " " + extendedClass : ""
    }`,
    onClick,
    role
  });
};

export default containerBuilder;
