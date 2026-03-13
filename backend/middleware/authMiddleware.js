const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: "Token tidak disediakan!" });

    const token = authHeader.split(' ')[1]; // Format: Bearer <token>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Token tidak valid!" });
        req.userId = decoded.id; // Simpan ID user ke request untuk dipakai di controller
        next();
    });
};