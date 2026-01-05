
import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import './SimpleUi.scss';

interface ButtonProps {
  label?: string,
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children?: React.ReactNode;
}

const variants = {
  primary: "btn btn--primary",
  secondary: "btn btn--secondary",
};

const sizes = {
  small: "btn--s-small",
  medium: "btn--m-medium",
  large: "btn--l-large",
};

const Button = ({
  label,
  to,
  variant,
  size,
  href,
  ...props
}: ButtonProps) => {

  return (<>
    {to ? <NavLink to={to} className={clsx(variants[variant || "primary"], sizes[size || "medium"])} {...props}>{label ?? props.children}</NavLink> : null}
    {!to && !href ? <button {...props} className={clsx(variants[variant || "primary"], sizes[size || "medium"])} {...props}>{label ?? props.children}</button> : null}
    {href ? <a href={href} className={clsx(variants[variant || "primary"], sizes[size || "medium"])} {...props}>{label ?? props.children}</a> : null}
  </>);
}

interface ButtonGroupProps extends ButtonProps {
  
}
const ButtonGroup = ({
  children,
  size = 'small',
  ...props
}: ButtonGroupProps) => {
  return (<div className="btn-group">
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      return React.cloneElement(child, {
        ...{ size },
        ...props,
      });
    })}
  </div>);
}

export { ButtonGroup };

export { Button };