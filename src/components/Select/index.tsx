import React from "react";
import "./style.css";

type SelectProps = {
    color: "primary" | "secondary";
    size: "regular" | "small" | "large";
    options: { id: string; value: string; icon?: string }[];
    value: string;
    onChange: (id: string) => void;
    disabled?: boolean;
    withIcons?: boolean;
};

const Select: React.FC<SelectProps> = ({
    color,
    size,
    options,
    value,
    onChange,
    disabled = false,
    withIcons = false,
}) => {
    const handleOptionClick = (id: string) => {
        if (!disabled) {
            onChange(id);
        }
    };

    return (
        <div className={`select-wrapper ${color} ${size} ${disabled ? "disabled" : ""}`}>
            <div className={`custom-options ${withIcons ? "with-icons" : ""} ${disabled ? "disabled" : ""}`}>
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`custom-option ${value === option.id ? "selected" : ""}`}
                        onClick={() => handleOptionClick(option.id)}
                    >
                        {withIcons && option.icon && (
                            <img src={option.icon} alt={option.value} className="option-icon" />
                        )}
                        <span>{option.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Select;
