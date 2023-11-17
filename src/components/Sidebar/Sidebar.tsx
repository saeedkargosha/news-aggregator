import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCompass } from "@fortawesome/free-regular-svg-icons";
import { FC } from "react";
import { classNameFactory } from "@/utils/dom";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useDisclosure } from "@/hooks/useDisclosure";
import { SettingsModal } from "..";
import { Divider } from "@/uikit";

interface ItemProps {
  title: string;
  icon: IconDefinition;
  to?: string;
  isActive?: boolean;
}

const cn = classNameFactory("sidebar");

const Item: FC<ItemProps> = ({ title, icon, to, isActive }) => {
  const content = (
    <li className={cn("item", { active: !!isActive })}>
      <FontAwesomeIcon icon={icon} className={cn("item-color")} />
      <p className={cn("item-title")}>{title}</p>
    </li>
  );

  if (to) return <Link to={to}>{content}</Link>;

  return content;
};

export const Sidebar = () => {
  const modal = useDisclosure();

  return (
    <>
      <nav className={cn("")}>
        <ul className={cn("items")}>
          <Item title="All" to="/" isActive={true} icon={faCompass} />
          <Divider />
          <li className={cn("folder")} onClick={modal.onOpen}>
            <p className={cn("folder-title")}>{"Settings"}</p>
          </li>
        </ul>
      </nav>
      <SettingsModal isOpen={modal.isOpen} onClose={modal.onClose} />
    </>
  );
};
