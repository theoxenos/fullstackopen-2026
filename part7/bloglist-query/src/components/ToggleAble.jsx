import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button } from "react-bootstrap";

const Toggleable = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const { buttonLabel, children } = props;

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    useImperativeHandle(ref, () => ({
        toggleVisibility,
    }));

    return (
        <div className={ isVisible ? 'col-12' : 'col-2'}>
            <div className={ isVisible ? 'd-none' : ''}>
                <Button variant="success" type="button" onClick={toggleVisibility}>{buttonLabel}</Button>
            </div>
            <div className={ isVisible ? '' : 'd-none'}>
                {children}
                <Button variant="secondary" type="button" onClick={toggleVisibility}>Cancel</Button>
            </div>
        </div>
    );
});

export default Toggleable;
