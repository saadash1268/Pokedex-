// Get the ol element by its ID and assign it to the constant
const pokedex = document.getElementById('pokedex');

// Define function called fetchPokemon 
const fetchPokemon = () => {

    // Create empty array to store promises
    const promises = [];

    // Iterate through the numbers of pokemon starting at 1
    for(let i = 1; i <= 151; i++) {

    // Construct the URL for the pokemon API using current iteration number (i)
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    // Push a promise to 'promises' array for each API request
    // promise fetches data from API and converts it to JSON
    promises.push(fetch(url).then( (res) => res.json()));
    }


        // After all promises are resolved, execeute the following block
        Promise.all(promises).then( results => {
            // Map over array of results to create new array of simplified 'pokemon' objects with the chosen data
            const pokemon = results.map( data => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(', ')
            }))


        // Call 'displayPokemon' function and pass the simplified 'pokemon' array    
        displayPokemon(pokemon)

        originalPokemonList = pokemon;
        
    });
      
};

// Define function 'displayPokemon' that takes array of 'pokemon' objects as a parameter
const displayPokemon = (pokemon) => {
    // Map over the array of 'pokemon' objects to create an HTML string for each
    const pokemonHTMLString = pokemon.map ( poke => `
    <li class="card">
        <img class="card-image" src= "${poke.image}"/>
        <h2 class="card-title"> ${poke.id}. ${poke.name}</h2>
        <p class=""card-subtitle">Type: ${poke.type}</p>
    </li>
    `).join("");

    // Set the inner HTML of the element with the ID 'pokedex'to the created HTML string
    pokedex.innerHTML = pokemonHTMLString;
}

const searchPokemon = () => {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    const filteredPokemon = originalPokemonList.filter(poke => {
        return poke.name.toLowerCase().includes(searchTerm);
    });
    displayPokemon(filteredPokemon);
}

// Call 'fectPokemon' function to start fetching and displaying pokemon
fetchPokemon();
