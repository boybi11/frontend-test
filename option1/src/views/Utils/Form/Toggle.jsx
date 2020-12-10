import React, {useState, useEffect} from 'react';

const Toggle = ({
    interpolate = [],
    onChange,
    value
}) => {
    const [active, setActive] = useState(value !== undefined ? (value === true ? true : (interpolate.indexOf(value) > 0 ? true : false)) : false);
    
    useEffect(() => {
        setActive(value !== undefined ? (value === true ? true : (interpolate.indexOf(value) > 0 ? true : false)) : false);
    }, [value]);

    return (
        <div
            className={`${active ? 'active' : ''} custom-toggle clickable`}
            onClick={() => {
                let value = !active;
                if (interpolate && Array.isArray(interpolate) && interpolate.length >= 2) {
                    value = active ? interpolate[0] : interpolate[1];
                }

                onChange(value);
                setActive(value);
            }}
        >
            <div />
        </div>
    );
};

export {Toggle};