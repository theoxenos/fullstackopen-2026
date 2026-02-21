import React from 'react';
import {Part} from "./Part.jsx";

const Content = ({parts}) => (
    <div>
        {parts.map(({exercises, name, id}) => (
            <Part key={id} exercises={exercises} name={name} />
        ))}
    </div>
);

export default Content;