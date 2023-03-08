const express = require ('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const auth = require('./routes/auth')
const subject = require('./routes/subject')
const teacher = require('./routes/teacher')
const admin = require('./routes/admin')
const config = require('./config/config')
require('./dbCon')

const app = express()
app.use(express.json())
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth)
app.use(subject)
app.use(teacher)
app.use(admin)

try{

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.listen(config.http_port, () => {
        console.log(`Running on port ${config.http_port}`)
      })

}catch(e){
    console.log("error",e)
}