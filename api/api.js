const recuperaDados = async(callback)=>{
    await fetch('https://terraq.com.br/api/teste-leaflet/visao-inicial')
       .then(r=>r.json())
           .then(d=>{
                callback(d)
           }

            )
           .catch(e=>console.log(e))

}

module.exports =recuperaDados