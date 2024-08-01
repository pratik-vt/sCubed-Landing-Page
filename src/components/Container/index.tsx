import * as React from "react"
import * as containerStyles from "./container.module.css"

type Props = {
  children: JSX.Element | JSX.Element[];
};


const Container: React.FC<Props> = ({ children }) => (
    <div className={containerStyles.container}>{children}</div>
);

export default Container;