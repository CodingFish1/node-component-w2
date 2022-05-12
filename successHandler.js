function successHandler(res){
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
       'Content-Type': 'application/json'
     }
     res.writeHead(200,headers)
     res.write(JSON.stringify({
         "status": "true",
         "message": 'OK-OK',
     }))
     res.end()
}

module.exports = successHandler