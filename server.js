const express = require('express')
const app = express()
const port = 3000

app.use(express.static(process.cwd() + "/usr/src/app/dist/employment-app/"));
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/usr/src/app/dist/employment-app/index.html")
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
