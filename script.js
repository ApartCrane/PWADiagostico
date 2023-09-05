document.addEventListener("DOMContentLoaded", function () {
  fetch('https://reqres.in/api/users?page=2')
    .then(response => response.json())
    .then(data => {

      data.data.forEach(data => {
        console.log('%c' + data.email, 'background: #777; color: #fff')
        const idInformation = document.getElementById('persona-info');
        const cardContent = `
          <h1 class="card-title">Persona</h1>
          <br/>
          <p class="card-text">email: ${data.email}</p>
          <p class="card-text">firstaname: ${data.first_name}</p>
          <p class="card-text">lastname: ${data.last_name}</p>
          <img class="rounded mx-auto d-block" src="${data.avatar}" >
        `;
        idInformation.innerHTML = cardContent;
      });

    })
    .catch(error => console.log(error));
});


function alertBien() {
  Swal.fire(
    'Bien',
    'Se hace lo que se puede profe:(',
    'question'
  )
}