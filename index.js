const server = require('./api/server');

/* ROUTERS */
const carsRouter = require('./api/cars/carsRouter');
const salesRouter = require('./api/sales/salesRouter');
server.use('/api/cars', carsRouter);
server.use('/api/sales', salesRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})