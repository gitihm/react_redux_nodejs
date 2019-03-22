const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser')

let bears = [{id: 1, name: 'จอนนี่', weight: 99},
    {id: 2, name: 'หมีพู', weight: 66}]

app.use(cors())
app.use('/api', bodyParser.json() ,router)
app.use('/api', bodyParser.urlencoded({extended:false}) ,router)

router.route('/bears')
    .get( (req, res) =>  res.json(bears) )

    // insert a new bear
    .post( (req, res)=> {
        var bear = {};
        bear.id =   bears[bears.length-1].id +1  ;
        //bear.id = req.body.bear_id
        bear.name = req.body.name
        bear.weight = req.body.weight
        bears.push(bear);
        res.json( {message: 'Bear created!'} )
    })


router.route('/bears/:bear_id')
    .get ( (req,res) => {
        let id = bears.findIndex( (bear) => bear.id === +req.params.bear_id)
        res.json(bears[id])
    })  // get a bear

    .put ( (req,res) => {                               // Update a bear
        // var id = req.params.bear_id
        let id = bears.findIndex( (bear) => bear.id === +req.body.bear_id)
        bears[id].name = req.body.name;
        bears[id].weight = req.body.weight;
        res.json({ message: 'Bear updated!' + req.params.bear_id});
    })

    .delete ( (req,res) => {                   // Delete a bear
        // delete     bears[req.params.bear_id]
        bears = bears.filter( (bear) => bear.id !== +req.params.bear_id )
        res.json({ message: 'Bear deleted: ' + req.params.bear_id});
    })

app.listen(3001, () => console.log('server ready'))