const express = require ('express')
const fs = require ('fs') 
const app = express();

app.use(express.static('./public'))
app.use(express.json()) 

const leerDatos = ()=>{
    try{
    const datos = fs.readFileSync('./public/productos.json')
    return JSON.parse(datos)
    }catch(error){
        console.log(error)
    }
}

const escribirDatos = (datos)=>{
    try{
    fs.writeFileSync('./public/productos.json',JSON.stringify(datos))

    }catch(error){
        console.log(error)
    }
}

function reIndexar(datos){
    let indice =1
    datos.map((datos)=>{
    datos.id = indice;
    indice++;
})
}


app.get('/Productos', (req,res)=>{
    const datos=leerDatos()
    res.json(datos)
})

app.post('/Productos', (req,res)=>{
    const datos = leerDatos()
    const nuevoProducto={id:datos.length+1,
        ...req.body
    }
    datos.push(nuevoProducto)
    escribirDatos(datos)
    res.json({mensaje:'Nuevo Producto Agregado',
        Producto:nuevoProducto
})
})

app.put('/Productos/:id', (req, res) => {
    const id = req.params.id;
    const nuevosDatos = req.body;
    let datos = leerDatos();
    const prodEncontrado = datos.find((p) => p.id == id);

    if (!prodEncontrado) {
        return res.status(404).json('No se encuentra el producto');
    }

    datos = datos.map(datos => datos.id == id ? { ...datos, ...nuevosDatos } : datos);
    escribirDatos(datos);
    res.json({ mensaje: 'Productos actualizados', Productos: nuevosDatos });
});

app.delete('/Productos/:id', (req,res)=>{
    const id = req.params.id
    let datos=leerDatos()
    const prodEncontrado = datos.find((datos)=>datos.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }
        datos = datos.filter((datos)=>datos.id!=req.params.id)
        reIndexar(datos)
        escribirDatos(datos)
        res.json({Mensaje:"Producto eliminado", Producto: prodEncontrado})
})

app.get('/Productos/:id', (req,res)=>{
    const datos=leerDatos()
    const prodEncontrado = datos.find((datos)=>datos.id==req.params.id)

        if(!prodEncontrado){
          return res.status(404),res.json('No se encuentra el producto')
        }
        else{
         return res.json({
            mensaje: "Producto encontrado",
            Producto: prodEncontrado
        })
        }
})
app.listen(3000, () => {
  console.log('Servidor en funcionamiento en http://localhost:3000');
});
