import { useLocation, useNavigate } from "react-router-dom";
import React, { MouseEvent } from "react";
import { ListItem, Link, StyledIcon } from "@/components/navigation/NavItem/styles";

type NavItemProps = {
  path: string;
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export function NavItem({ path, label, icon }: NavItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === path;

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const handleNavigation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (label === "Logout") {
      removeToken();
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <ListItem $active={isActive}>
      <Link href={path} onClick={handleNavigation} $active={isActive} $label={label}>
        <StyledIcon icon={icon} $active={isActive} />
        <span>{label}</span>
      </Link>
    </ListItem>
  );
}
