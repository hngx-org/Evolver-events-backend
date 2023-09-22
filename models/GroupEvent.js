import db from '../config/db.js';
import { DataTypes } from 'sequelize'
import groups from './groups.js';
import Event from './Event.js';


const GroupEvent = db.define("group_events",{
    group_id: {
        type: DataTypes.UUID,
        references: {
            model: groups,
            key: "id",
          },
          allowNull: false,
      },
      event_id:{
        type: DataTypes.UUID,
        references: {
            model: Event,
            key: "id",
          },
          allowNull: false,
      },
})

GroupEvent.belongsTo(groups, { foreignKey: 'group_id' });
GroupEvent.belongsTo(Event, { foreignKey: 'eventId' });

export default GroupEvent;