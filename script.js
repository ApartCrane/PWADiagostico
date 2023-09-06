document.addEventListener("DOMContentLoaded", function () {
    fetch('https://reqres.in/api/users?page=2')
        .then(response => response.json())
        .then(data => {

            const personaInfo = document.getElementById('persona-info');

            data.data.forEach(user => {
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                        <div class="card mb-4">
                            <img src="${user.avatar}" class=" mx-auto d-block" >
                            <div class="card-body">
                                <h1 class="card-title">${user.first_name} ${user.last_name}</h1>
                                <p class="card-text">Email: ${user.email}</p>
                                <button type="button" class="btn btn-danger" id="eliminar-${user.id}" onclick="eliminarUsuario(${user.id})">Eliminar</button>
                                <button type="button" class="btn btn-warning" id="eliminar-${user.id}" onclick="editarUsuario(${user.id})">Editar</button>
                            </div>
                        </div>
                    `;
                personaInfo.appendChild(card);
            });

        })
        .catch(error => console.log(error));
});

function agregarUsuario() {
    const nombre = document.getElementById('nombreInput').value;
    const trabajo = document.getElementById('trabajoInput').value;

    fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nombre,
                job: trabajo,
            }),
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire('Bien', 'Se agrego al usuario', 'success');
            console.log(data);

        })
        .catch(error => {
            console.error(error);
        });
}
function eliminarUsuario(userId) {
    Swal.fire({
        title: 'Eliminar usuario',
        text: 'Seguro de eliminarlo? :( ',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'Canvlear',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://reqres.in/api/users/${userId}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {

                        Swal.fire('Bien', 'Se elimino el usuario', 'success');
                        console.log("En efecto, se elimino");
                    } else {
                        console.log("Checale, algo no dio :(");
                    }
                })
                .catch(error => {
                    console.log(error);

                });
        }
    });
}

function editarUsuario(userId) {
    const nombre = "Diego"
    const trabajo = "Chambeador"
    fetch('https://reqres.in/api/users/${userId}',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                name: nombre,
                job: trabajo,
            }),
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire('Bien', 'Se actualizo al usuario', 'success');
            console.log(data);
    })
    .catch(error => {
            console.error(error);
        });
}