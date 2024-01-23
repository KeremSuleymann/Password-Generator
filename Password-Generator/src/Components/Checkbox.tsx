import { ChangeEventHandler } from "react";

interface CheckboxProps {
    id:string;
    label:string;
    value: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({ value, onChange,label,id }: CheckboxProps){


    return (
        <label>
            {`${label}: `}
            <input id={id} type="checkbox" checked={value} onChange={onChange} />
        </label>
    );
};

export default Checkbox;
