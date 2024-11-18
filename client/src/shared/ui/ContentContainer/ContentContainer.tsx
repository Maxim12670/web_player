import { ReactElement } from "react";

interface ContentContainerProps {
    children: ReactElement;
}

const style = { display: "block",  margin: "0 auto", width: "144rem" };

const ContentContainer = ({ children }: ContentContainerProps) => {
    return <div style={style}>{children}</div>;
};

export default ContentContainer;
