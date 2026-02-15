import React from 'react';
import {Part} from "./Part.jsx";

const Content = ({parts}) => (
    <div>
        {parts.map(({exercises, name}) => (
            <Part exercises={exercises} name={name} />
        ))}
    </div>
);

export default Content;