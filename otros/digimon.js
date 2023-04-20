const form = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsDiv = document.querySelector('#results');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    resultsDiv.innerHTML = 'Buscando...';
    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        resultsDiv.innerHTML = 'Indica el nombre del digimon que desear buscar';
        return;
    }
    try {
        const apiDigimon = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${searchTerm}`);
        const data = await response.json();
        if (data.length === 0) {
            resultsDiv.innerHTML = 'Digimon no encontrado'
        }
        const digimonCard = data.map(digimon => {
            return ` 
            <article>
                <div class="card">
                    <img src="${digimon.img}" alt="${digimon.name}">
                <h2>${digimon.name}</h2>
                <span>${digimon.level}</span>
                </div>
            
            </article>
            
            `

        });

    resultsDiv.innerHTML = digimonCard.join();

    } catch (error) {
        resultsDiv.innerHTML = 'Algo salió mal :('
        console.log(error);
    } 
})

