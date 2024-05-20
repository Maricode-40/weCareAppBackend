import app from "./app";
import { dataSource } from "./database/data-source";

const PORT = 3000;

dataSource.initialize().then(() => {
    app.listen(PORT, () => console.log(`🚀 server running on port ${PORT}`));
console.log(` Data source initialized`);

}). catch( (error) => { 
    console.error(error);
    process.exit(1);
});



