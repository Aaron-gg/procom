module.exports = (schema) => {
    return async (req, res, next) => {
        try{
            await schema.validateAsync(req.body);
            next();
        } catch(error) {
            console.log(`[validateData][error]: ${JSON.stringify(error.details[0])}`);
            res.status(400).send(error.details[0]);
        }
    }
}