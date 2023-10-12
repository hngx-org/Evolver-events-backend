import Event from '../../../model/Event.js';


export const getEventDetails = async (req, res) => {
  try {
  
    const { eventId } = req.params;

    
    const event = await Event.findByPk(eventId);

    if (!event) {
      
      return res.status(404).json({ message: 'Event not found' });
    }

    
    return res.status(200).json(event);
  } catch (error) {
    
    console.error('Error fetching event details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

