const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { id, username, email, password, isAdmin } = req.body;
    try {
        if (!username) return res.status(400).json({ error: 'username is required' });
        if (username.length < 3) return res.status(400).json({ error: 'username must be at least 3 characters long' });
        
        if (!email) return res.status(400).json({ error: 'email is required' });
        
        if (!password) return res.status(400).json({ error: 'password is required' });
        if (password.length < 8) return res.status(400).json({ error: 'password must be at least 8 characters long' });
        if ((password.match(/\d/g) || []).length < 3) return res.status(400).json({ error: 'password must contain at least 3 numbers' });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ id, username, email, password: hashedPassword, isAdmin });
        
        res.status(201).json({ message: (isAdmin ? 'admin' : 'user') +' registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: 'email already exists' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;