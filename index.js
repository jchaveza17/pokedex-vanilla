async function getPokemonData() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/generation/1/');
    const pokemonData = response.data;
    const cardContainer = document.getElementById('pokemonContainer');

    for (pokemonEntry of pokemonData.pokemon_species) {
      const pokemon = pokemonEntry.name;

      const pokemonType = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const types = pokemonType.data.types.map((type) => type.type.name);
      const pokemonID = pokemonType.data.id;

      const listItem = document.createElement('li');
      listItem.textContent = `Dex Entry: ${pokemonID} Name: ${
        pokemon[0].toUpperCase() + pokemon.slice(1)
      } Types: ${types.join(', ')}`;

      cardContainer.appendChild(listItem);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
getPokemonData();
