async function getPokemonData() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/generation/1/');
    const pokemonData = response.data;

    for (pokemonEntry of pokemonData.pokemon_species) {
      const pokemon = pokemonEntry.name;

      const pokemonType = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const types = pokemonType.data.types.map((type) => type.type.name);
      const pokemonID = pokemonType.data.id;

      console.log(pokemonID);
      console.log(pokemon);
      console.log(types);
    }
  } catch (error) {}
}
getPokemonData();
