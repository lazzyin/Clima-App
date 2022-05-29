const express = require('express')
const hbs=require("hbs")
const path=require("path")
const app = express();

const weatherData=require('../utils/weatherData')

const port = process.env.PORT || 8000

const publicStaticDirPath=path.join(__dirname,'../public')

const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Clima App'
    })
})

//localhost:8000/weather?address=ENDEREÇO
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error:"Informe o nome da cidade"
        })
    }

    weatherData(address, (error, { temperature, description, cityName } = {}) =>
    {
        //console.log(result)
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName)
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get("*", (req, res) => {
    res.render('404',{
        title:"Pagina não encontrada"
    })
})

app.listen(port, () => {
    console.log("Server rodando na porta: ",port)
})
