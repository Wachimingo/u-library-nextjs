import containerBuilder from "./containerBuilder";
import styles from "./container.module.css";

const Page = (props: any) => containerBuilder("div", props, styles["page"]);

export default Page;
