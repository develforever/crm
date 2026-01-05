
import React from 'react';
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import './SimpleUi.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string,
    to?: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
};

const Button = ({
    label,
    to,
    ...props
}: ButtonProps) => {

    return (<>
        {to ? <NavLink to={to} className={clsx(variants[props.variant || "primary"])}>{label??props.children}</NavLink> : null}
        {!to ? <button {...props} className={clsx(variants[props.variant || "primary"])}>{label??props.children}</button> : null}
    </>);
}

export { Button };