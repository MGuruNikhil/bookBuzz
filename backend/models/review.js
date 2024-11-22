import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userDisplayName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'reviews'
});

export default Review;