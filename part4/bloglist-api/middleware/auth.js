import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.substring(7);
    }

    next();
};

const userExtractor = async (req, res, next) => {
    const { token } = req;
    if (!token) {
        return res.status(401).json({ error: 'token missing' });
    }

    const decodedtoken = jwt.verify(token, process.env.SECRET);
    if (!decodedtoken.id) {
        return res.status(401).json({ error: 'token invalid' });
    }

    req.user = await User.findById(decodedtoken.id);
    if (!req.user) {
        return res.status(401).json({ error: 'user not found' });
    }

    return next();
};

export default { tokenExtractor, userExtractor };
