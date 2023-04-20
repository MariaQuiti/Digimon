const form = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsDiv = document.querySelector('#results');

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	resultsDiv.innerHTML = 'Buscando...';
	const searchTerm = searchInput.value.trim();
	if (searchTerm === '') {
		resultsDiv.innerHTML = 'Ingrese un término de búsqueda.';
		return;
	}
	try {
		const response = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${searchTerm}`);
		const data = await response.json();
		if (data.length === 0) {
			resultsDiv.innerHTML = 'No se encontraron resultados.';
			return;
		}
		const digimonCards = data.map(digimon => {
			return `
			<article>
				<div class="card mb-3" style="width: 18rem;" id="resultCard">
					<img src="${digimon.img}" alt="${digimon.name}" class="card-img-top">
					<div class="card-body">
    					<h5 class="card-title">${digimon.name}</h5>
  					</div>
					<ul class="list-group list-group-flush">
					  <li class="list-group-item">${digimon.level}</li>
					</ul>
				</div>
			</article>
			`;
		});
		resultsDiv.innerHTML = digimonCards.join('');
	} catch (error) {
		resultsDiv.innerHTML = 'Ocurrió un error al realizar la búsqueda.';
		console.error(error);
	}
});

