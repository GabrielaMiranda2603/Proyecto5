console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        marca:"",
        modelo:"",
        imagen:"",
        stock:0,
        precio:0,
        url:'http://localhost:5000/index/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.marca = data.marca;
                    this.modelo = data.modelo;
                    this.imagen=data.imagen
                    this.stock=data.stock
                    this.precio=data.precio                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                marca:this.marca,
                modelo:this.modelo,
                precio: this.precio,
                stock: this.stock,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./index.html";             
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')