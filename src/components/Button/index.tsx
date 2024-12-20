import React from "react";
import "./style.css";

type ButtonProps = {
    color: "primary" | "secondary" | "danger";
    size: "regular" | "small" | "large";
    icon?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    iconDirection?: "left" | "right";
};

const Button: React.FC<ButtonProps> = ({
    color,
    size,
    icon,
    children,
    onClick,
    iconDirection = "left",
    disabled = false,
    className = ""
}) => {
    return (
        <button
            onClick={onClick}
            className={`${className} button ${color} ${size} ${disabled ? "disabled" : ""} ${!children ? "icon-only" : ""}`}
            disabled={disabled}
        >
            {icon && iconDirection === "left" && <img src={icon} className="icon-left" />}
            {children && <span>{children}</span>}
            {icon && iconDirection === "right" && <img src={icon} className="icon-right" />}
        </button>
    );
};


export default Button;
