import React from "react"; 

const DropDown = ({ label, value, options, onChange }) => {

    return (
        <label>
            {label}
            <select value={value} onChange={onChange}>
                {options.map((option)=>{
                    return <option value={option.value}>{option.label}</option>
                })}
            </select>
        </label>
    )
}

export default DropDown; 

