import styles from "../NavMenu.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { setActiveItem } from "@app/store/storeSlices/menuSlice";

interface IMenuItem {
  list: {
    items: { title: string; route: string }[];
    smallSize?: boolean;
  };
}

export const MenuPageItem = ({ list }: IMenuItem) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activePathMenu = useAppSelector((state) => state.menu.path);

  const itemStyles = `${styles.sidebar__item} ${list.smallSize ? styles.sidebar__item_small : ""}`;

  const handleClick = (path: string) => {
    navigate(path);
    dispatch(setActiveItem(path));
  };

  return (
    <>
      {list.items.map((item, i) => (
        <li
          key={i}
          className={`${itemStyles} ${item.route == activePathMenu && styles.sidebar__item_active}`}
          onClick={() => handleClick(item.route)}
        >
          {item.title}
        </li>
      ))}
    </>
  );
};
