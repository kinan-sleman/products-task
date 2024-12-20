import React from "react";
import "./style.css";

interface CheckBoxProps {
    label?: string;
    icon?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, icon, checked, onChange }) => {
    const id = `checkbox-${label}`;

    return (
        <div className="checkbox-container">
            <input
                type="checkbox"
                className="checkbox-input"
                id={id}
                checked={checked}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.checked);  
                    }
                }}
            />
            <label
                className="checkbox-label"
                htmlFor={id}
            >
                {icon && <img src={icon} alt={label} />}
                {label}
            </label>
        </div>
    );
};

export default CheckBox;
