import containerBuilder from "./containerBuilder";
import styles from "./container.module.css";

const Page = (props) => containerBuilder("div", props, styles["page"]);

export default Page;
