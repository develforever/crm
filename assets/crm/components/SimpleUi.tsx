
import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import './SimpleUi.scss';
import { da } from 'zod/v4/locales';

interface ButtonProps {
  label?: string,
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children?: React.ReactNode;
  [key: string]: any;
}

const variants = {
  primary: "btn btn--primary",
  secondary: "btn btn--secondary",
  danger: "btn btn--danger",
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


const EditableDiv = ({
  content,
  onChange,
  ...props
}: {
  content: string;
  onChange: (newContent: string) => void;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.innerText);
  };

  return (
    <div
      title='Double click for editing'
      onDoubleClick={(e) => {
        e.currentTarget.contentEditable = "true";
        e.currentTarget.focus();
      }}
      suppressContentEditableWarning
      onBlur={(e) => {
        e.currentTarget.contentEditable = "false";
        handleBlur(e);
      }}
      {...props}
    >
      {content}
    </div>
  );
};

export { EditableDiv };