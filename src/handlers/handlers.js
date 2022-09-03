// Handle not found errors
const notFound = (req, res) => {
    console.log(`[notFound][req]: ${req}`);
    res.status(404).json({ message: 'Petición no encontrada (404), regrese a la pagina anterior, recargue la pagina o verifique su consulta' });

};

// Handle internal server errors
const internalServerError = (err, req, res) => {
    console.log(`[internalServerError][error]: ${err}`);
    res.status(500).json({ message: err.message, errors: err });

};

module.exports = {
    internalServerError,
    notFound
};