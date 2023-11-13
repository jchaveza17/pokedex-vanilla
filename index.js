async function getPokemonData() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/generation/1/');
    const pokemonData = response.data;
    const cardContainer = document.getElementById('pokemonContainer');
    const searchInput = document.getElementById('searchPokemon');

    searchInput.addEventListener('input', () => {
      const search = searchInput.value.toLowerCase();

      for (const listItem of cardContainer.getElementsByTagName('li')) {
        const pokemonName = listItem.textContent
          .split('Name: ')[1]
          .split(' ')[0]
          .toLowerCase();
        if (pokemonName.includes(search)) {
          listItem.style.display = 'block';
        } else {
          listItem.style.display = 'none';
        }
      }
    });

    for (const pokemonEntry of pokemonData.pokemon_species) {
      const pokemon = pokemonEntry.name;

      const pokemonType = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const types = pokemonType.data.types.map((type) => type.type.name);
      const pokemonID = pokemonType.data.id;
      const sprite = pokemonType.data.sprites.front_default;

      const listItem = document.createElement('li');
      listItem.textContent = `Dex Entry: ${pokemonID} Name: ${
        pokemon[0].toUpperCase() + pokemon.slice(1)
      } Types: ${types.join(', ')}`;

      const pokemonSprites = document.createElement('img');
      pokemonSprites.src = sprite;
      listItem.appendChild(pokemonSprites);

      cardContainer.appendChild(listItem);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

getPokemonData();
