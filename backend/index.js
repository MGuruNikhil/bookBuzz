import app from "./app.js";
import { PORT } from "./config.js";
import sequelize from "./database.js";
import './models/index.js'; // Ensure the associations are defined

// Synchronize the models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
        console.log(`listening:${PORT}`);
    });
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});

export default app; // Add this line to export the app instance