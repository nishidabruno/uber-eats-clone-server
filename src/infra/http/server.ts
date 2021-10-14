import { createTypeormConnection } from '@config/typeorm';

import { app } from './app';

// Connection to the database needs to be done here, otherwise
// it may cause memory leak on integration tests.
createTypeormConnection();

app.listen(3333, () => console.log('Server is running on port 3333.'));
