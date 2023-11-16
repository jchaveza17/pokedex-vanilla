async function getPokemonData() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/generation/1/');
    const pokemonData = response.data;
    const cardContainer = document.getElementById('pokemonContainer');
    const searchInput = document.getElementById('searchPokemon');

    const typeColors = {
      fire: 'red',
      water: 'lightblue',
      grass: 'lightgreen',
      bug: 'lightgreen',
      normal: 'lightgrey',
      poison: 'purple',
      flying: 'lightblue',
      ground: 'orange',
      fighting: 'orange',
      psychic: 'purple',
      electric: 'yellow',
      fairy: 'lightpink',
      ghost: 'purple',
      dragon: 'brown',
      ice: 'lightblue',
      rock: 'orange',
    };

    searchInput.addEventListener('input', () => {
      const search = searchInput.value.toLowerCase();

      for (const listItem of cardContainer.getElementsByTagName('li')) {
        const pokemonName = listItem
          .querySelector('h3')
          .textContent.toLowerCase();
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
      const types = pokemonType.data.types.map((type) =>
        type.type.name.toLowerCase()
      );
      const capitalizedTypes = types.map(
        (type) => type.charAt(0).toUpperCase() + type.slice(1)
      );
      const pokemonID = pokemonType.data.id;
      const sprite = pokemonType.data.sprites.front_default;

      const listItem = document.createElement('li');
      listItem.classList.add('pokemon-card');

      if (types.length > 0) {
        const firstType = types[0];
        const typeColor = typeColors[firstType] || '';
        listItem.style.backgroundColor = typeColor;
      }

      const name = document.createElement('h3');
      name.textContent = `${pokemon[0].toUpperCase() + pokemon.slice(1)}`;
      listItem.appendChild(name);

      const pokemonSprites = document.createElement('img');
      pokemonSprites.src = sprite;
      pokemonSprites.classList.add('pokemon-image');
      listItem.appendChild(pokemonSprites);

      const infoContainer = document.createElement('div');
      infoContainer.classList.add('pokemon-info');

      const dexEntry = document.createElement('p');
      dexEntry.textContent = `Dex Entry: ${pokemonID}`;
      infoContainer.appendChild(dexEntry);

      const type = document.createElement('p');
      type.textContent = `Types: ${capitalizedTypes.join(', ')}`;
      infoContainer.appendChild(type);

      listItem.appendChild(infoContainer);

      cardContainer.appendChild(listItem);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

getPokemonData();
