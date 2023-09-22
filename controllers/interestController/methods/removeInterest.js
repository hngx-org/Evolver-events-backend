import userInterest from '../../../models/Interest.js';


export const removeInterest = async(req, res) =>{
        try{
            const {eventId, userId} = req.params;

            const deletedInterest = await userInterest.destroy({
                where: {
                    group_id: groupId,
                    user_id: userId,
                  },
            });

            if (deletedInterest === 0){
                return res.status(404).json({ error: 'User interest not found in the Event' });
            }

            return res.status(200).json({ message: 'User interest removed from the Event' });
        }catch(error){
            console.error('Error removing Interest from the event:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }
}
