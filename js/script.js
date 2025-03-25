
// obtener datos simulados de usuarios desde la [API JSONPlaceholder](https://jsonplaceholder.typicode.com/users)

// se agrega una edad aleatoria a cada usuario
//  - Crea un nuevo array con el objeto y con los nuevos datos a añadir (age, img, address con los nuevos datos) -- Spread operator

// Cada usuario tendrá una imagen asociada por `ID` (están en la carpeta assets/img) son extensión `.jpeg`

// Muestra detalles específicos de cada usuario en la lista en el DOM: name, age, username, img, phone, email, company, address

// address tendrá estos datos como valor: usuario.address.street, usuario.address.suite, usuario.address.city




const MIN = 18 // Valores MIN y MAX función ageRandom
const MAX = 65
const ENDPOINT = "https://jsonplaceholder.typicode.com/users"//Variable con el endpoint
const ageRandom = () => Math.floor(Math.random() * (MAX - MIN) + MIN); //variable con la función para obtener la edad aleatoria
const listaUsuarios = document.getElementById('listaUsuarios');// Captura del ID donde crearemos la lista en el DOM

function getUSers () {                          //---> Responsabilizamos a cada parte del programa, separando - recogida de datos con fetch, - recorrido y dedeconstructing del objeto, y - una función template con la impresión de cada usuario             
    return fetch(ENDPOINT).then((response) =>{
        if (!response.ok) {                                 
            throw new Error(`Error: ${response.status}`) // Control de errores
        }
        return response.json()
    }
)} // Funcion recogida de datos

getUSers().then((data) => {    // Recorrido del array de objetos con .map() y DESTRUCTURING del priner objeto, para después escalarlo
    const result = data.map((user) => {
        const { id } = user   // Variable en la que extraemos id para insertar las imagenes
        const { street, suite, city } = user.address   // Variable const en la que extraemos estos valores-clave ubicados en el objeto address
        const newUser = {   // Creación de nuevo objeto, y creación de los valores-clave necesarios.
            ...user,                                           
            age: ageRandom(),
            image: `../assets/img/${id}.jpeg`,
            address: `${street} ${suite} ${city}`  // PLATILLA DE CADENAS DE TEXTO / TEMPLATE LITERALS: función agregada en ES2015. 
            // Te permite crear cadenas de texto utilizando varias líneas de texto y meter valores dentro de la misma utilizando ${expression}
        }
        const {name, age, username, image, phone, email, address,} = newUser // DESPUÉS DE CREAR EL OBJETO NUEVO (newUser), extraemos lo que necesitamos.
        return template(name, age, username, image, phone, email, address,)   // Se retorna el template con los valores del objeto creado newUser
    });
    listaUsuarios.innerHTML = result.join("")   // Con innerHTML, creamos los NODOS deseados en el DOM. ----> Con .Join(""), .map() genera una copia y va concatenado y metiendo los datos solo 1 vez.
    // (DIFERENCIA CON forEach(), este no genera copia y hace una operativa, que va cogiendo el que está + el anterior y así sucesivamente hasta terminar de recorrer el array de objetos)
    // ---> GENERA MUCHO MÁS COSTE, CARGA MÁS PESADA <---  

}).catch(error => console.log(error)); // Control de errores


function template (nombre, edad, usuario, imagen, telefono, correo, direccion) {  // Funcion template con argumentos, con la distribución que irá en el DOM. Retorna la lista Se le meten los valores que enlazan como argumentos de la función. 
  return `      
  <li>
  <div class="data">
    <div class="info">
      <h2>nombre:${nombre}</h2> 
      <p>username:${usuario}</p>
      <p>${edad}</p>
      <p>email:${correo}</p>
    </div>
    <div>
      <img src=${imagen} alt=${nombre} />
    </div>
  </div>
  <div class="direccion">
    <p>phone:${telefono}</p>
    <p>${direccion}</p>
  </div>
  </li>
  `
}

// <p>Compañia: ${user.company.name}</p>

/*
<li> ---> MI LISTA PARA EL DOM <---
    <div class:"userData">
      <div class="info">
        <p>Nombre: ${nombre} </p>
        <p>Edad: ${edad} </p>
        <p>Username: ${usuario}</p>
        <p>Phone: ${telefono}</p>
        <p>Email: ${correo}</p>
      </div>
      <div class="image">
        <img src=${imagen} alt=${nombre} />
      </div>
    </div>
    <div class="work">
      <p>Dirección: ${direccion}</p>
    </div>
    </li>
    `
*/