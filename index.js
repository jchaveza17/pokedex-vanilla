document.addEventListener('DOMContentLoaded', function () {
  const pokemonList = document.querySelector('.cardContainer');

  async function getPokemonNames() {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/generation/1/'
      );
      const data = response.data;
      const pokemonNames = data.pokemon_species;

      pokemonNames.forEach((pokemon) => {
        const pokeList = document.createElement('li');
        pokeList.textContent = pokemon.name;
        pokemonList.appendChild(pokeList);
      });
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }
  getPokemonNames();
});
