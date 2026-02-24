const Notify = ({messages}: {messages: string[]}) => {
    const style = {
        color: 'rgb(88, 21, 28)',
        fontWeight: 'bold',
        border: '1px solid rgb(241, 174, 181)',
        padding: '0.5rem',
        backgroundColor: 'rgb(248, 215, 218)',
    }
    
    if(!messages || messages.length < 1) {
        return null;
    }
    
    return (
        <div style={style}>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    )
};

export default Notify;