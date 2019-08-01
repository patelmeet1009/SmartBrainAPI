const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: 'b4112a015f24487ca28158b1dec6efe8'
   });

const handleAPICall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
}

const handleImage = (req, res, db)=> {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Error getting user'))
}


module.exports = {
    handleImage : handleImage,
    handleAPICall: handleAPICall
}