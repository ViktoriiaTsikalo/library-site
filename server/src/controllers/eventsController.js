import { eventsCollection } from '../../db/models/events.js';

const getAllEvents = async (req, res) => {
  const events = await eventsCollection.find().sort({ eventDate: 1 });
  res.json(events);
};

const createEvent = async (req, res) => {
  const { title, description, eventDate } = req.body;
  const event = await eventsCollection.create({ title, description, eventDate });
  res.status(201).json(event);
};

const deleteEvent = async (req, res) => {
  const result = await eventsCollection.findByIdAndDelete(req.params.id);
  if (!result) {
    return res.status(404).json({ message: 'Подію не знайдено' });
  }
  res.sendStatus(204);
};

export default {
  getAllEvents,
  createEvent,
  deleteEvent,
};
