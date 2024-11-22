import Icons from "./IconsSvg.svg";

interface IUseSvg {
    className?: string;
    id: string;
}

const UseSvg = ({ className, id }: IUseSvg) => {
    return (
        <svg className={className}>
            <use xlinkHref={Icons + "#icon-" + id} style={{ width: "100%", height: "100%" }}></use>
        </svg>
    );
};

export default UseSvg;
