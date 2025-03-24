
// obtener datos simulados de usuarios desde la [API JSONPlaceholder](https://jsonplaceholder.typicode.com/users)

// se agrega una edad aleatoria a cada usuario
//  - Crea un nuevo array con el objeto y con los nuevos datos a añadir (age, img, address con los nuevos datos) -- Spread operator

// Cada usuario tendrá una imagen asociada por `ID` (están en la carpeta assets/img) son extensión `.jpeg`

// Muestra detalles específicos de cada usuario en la lista en el DOM: name, age, username, img, phone, email, company, address

// address tendrá estos datos como valor: usuario.address.street, usuario.address.suite, usuario.address.city

/*const [user1, ...rest] = users;
console.log(user1)
console.log(rest);*/



const listaUsuarios = document.getElementById('listaUsuarios');
console.log(listaUsuarios)


fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
    
        data.forEach((user) => {
            listaUsuarios.innerHTML +=`
            <li>
                <div class:"userData">
                    <p>Nombre: ${user.name} </p>
                    <p>Edad: </p>
                    <p>Username: ${user.username}</p>
                    <p>Phone: ${user.phone}</p>
                    <p>Email: ${user.email}</p>
                </div>
                <div class="image">
                    <img src:"./img/1.jpeg" alt=${user.name}/>
                </div>
                <div class="work">
                    <p>Compañia: ${user.company.name}</p>
                    <p>Dirección: ${user.address.street}, ${user.address.suite}, ${user.address.city}</p>
                </div>
            </li>
            
            `
               
       }) 
    });
