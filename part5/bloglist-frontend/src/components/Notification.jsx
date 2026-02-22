import { NotificationType } from "../constants/enums.js";

const Notification = (props) => {
    const { message, type } = props;
    const baseStyle = {
        backgroundColor: '#D3D3D3FF',
        borderRadius: '5px',
        fontSize: '18px',
        marginBottom: '1.5rem',
        padding: '0.5rem',
    };

    const notificationStyles = {
        [NotificationType.SUCCESS]: {
            ...baseStyle,
            border: '3px solid oklch(53.2% 0.157 131.589)',
            color: 'oklch(53.2% 0.157 131.589)',
        },
        [NotificationType.ERROR]: {
            ...baseStyle,
            border: '3px solid oklch(58.6% 0.253 17.585)',
            color: 'oklch(58.6% 0.253 17.585)'
        }
    };

    if (message === '') {
        return null;
    }

    return (
        <div style={notificationStyles[type]}>{message}</div>
    );
};

export default Notification;
