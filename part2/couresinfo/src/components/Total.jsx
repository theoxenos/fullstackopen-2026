const Total = ({parts}) => {
    const sum = parts.reduce((sum, current) => sum + current.exercises, 0);
    
    return (
        <p>
            <strong>Number of exercises {sum}</strong>
        </p>
    );
};

export default Total;