const express = require('express');
const {Event} = require('../models');
const {RSVP} = require('../models');
const { isAdmin } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
    if(!req.headers.authorization) return res.status(401).json({error: "unauthorized"});

    const token = req.headers.authorization?.split(" ")[1];
    const payload = jwt.decode(token);
    const userId = payload.userId; 

    const events = await Event.findAll({
        include: [{
            model: RSVP,
            attributes: ['id'],
            where: { user_id: userId },
            required: false, // Left join to check RSVP status
        }],
    });

    const response = events.map(event => ({
        id: event.id,
        name: event.name,
        description: event.description,
        date: event.date,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        rsvped: event.RSVPs.length > 0, // Check if the user has RSVPed
    }));

    res.json(response);
});

// Create a new event
router.post('/', isAdmin, async (req, res) => {
    const event = await Event.create(req.body);
    res.status(201).json({ message: "event created successfully" , event });
});

// RSVP to an event
router.post('/:id/rsvps', async (req, res) => {
    if(!req.headers.authorization) return res.status(401).json({error: "unauthorized"});

    const token = req.headers.authorization?.split(" ")[1];
    const payload = jwt.decode(token);
    const userId = payload.userId; 
    const eventId = req.params.id;
    

    // Ensure the event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({ error: "Event not found." });
    }

    // Create the RSVP
    const rsvp = await RSVP.create({ user_id: userId, event_id: eventId });
    res.status(201).json({ message: "RSVP confirmed for event" , rsvp });
});

// Get RSVPs for an Event (Admin Only)
router.get('/:eventId/rsvps', isAdmin, async (req, res) => {
    const { eventId } = req.params;

    // Ensure the event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({ error: "Event not found." });
    }

    // Retrieve RSVPs
    const rsvps = await RSVP.findAll({
        where: { event_id: eventId },
        include: [{ model: User, attributes: ['id', 'username', 'email'] }],
    });

    const response = rsvps.map(rsvp => ({
        rsvpId: rsvp.id,
        userId: rsvp.User.id,
        username: rsvp.User.username,
        email: rsvp.User.email,
    }));

    res.json(response);
});

// Delete an Event (Admin Only)
router.delete('/:eventId', isAdmin, async (req, res) => {
    const { eventId } = req.params;

    // Ensure the event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
        return res.status(404).json({ error: "Event not found." });
    }

    // Delete the event
    await event.destroy();
    res.json({ message: "Event deleted successfully." });
});

module.exports = router;