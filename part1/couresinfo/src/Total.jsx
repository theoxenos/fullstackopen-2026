import React from 'react';

const Total = ({parts}) => {
    const exercises = parts.map(({exercises}) => (exercises));
    const sum = exercises.reduce((accumulator, currentValue) => accumulator + currentValue);
    
    return (
        <p>
            Number of exercises {sum}
        </p>
    );
};

export default Total;