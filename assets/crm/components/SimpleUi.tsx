
import React from 'react';
import { NavLink } from "react-router-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string,
    to?: string;
}

const Button = ({
    label,
    to,
    ...props
}: ButtonProps) => {

    return (<>
        {to ? <NavLink to={to} className="nav-link">{label}</NavLink> : null}
        {!to ? <button {...props}>{label}</button> : null}
    </>);
}

export { Button };