const request = require('request')
const constants=require('../config')

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.base_url + encodeURIComponent(address) + '&lang=pt_br&appid=' + constants.openWeatherMap.secret
 //   console.log(url)
    request({ url, json: true }, (error, { body }) => {
 //       console.log(body);
        if (error) {
            callback("Dados não encontrados da API",undefined)
        } else if (!body.main || !body.main.temp || !body.name || !body.weather)
        {
           callback ("Cidade não encontrada, tente outra cidade",undefined)
        }
        else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName:body.name
            })
        }
    })

}
module.exports=weatherData