import jwt from 'jsonwebtoken';

const getToken = ({ _id: id, username }) => jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '1h' });

export default { getToken };
