import containerBuilder from "./containerBuilder";
import styles from "./container.module.css";

const Center = (props) => containerBuilder("div", props, styles["center"]);

export default Center;
