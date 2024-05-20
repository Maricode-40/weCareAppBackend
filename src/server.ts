import app from "./app";
import { dataSource } from "./database/data-source";

const PORT = 3000;

app.listen(PORT, () => console.log(`🚀 server running on port ${PORT}`));

dataSource.initialize().then(() => console.log(` Data source initialized`));
