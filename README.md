# PruebaPokemon

Este proyecto es una aplicación de lista de Pokémons desarrollada en Angular 17 que utiliza [PokeAPI](https://pokeapi.co/api/v2/).

## Características

1. **Listado de Pokémon con Paginación:**
   - [x] Utiliza el servicio de PokeAPI con la ruta `/pokemon` para listar los Pokémon.
   - [x] Implementa la paginación para permitir al usuario navegar entre las diferentes páginas de Pokémon.

2. **Visualización de Detalles del Pokémon:**
   - [x] Permite al usuario hacer clic en un Pokémon de la lista para ver sus detalles.
   - [x] Utiliza el servicio de PokeAPI con la ruta `/pokemon/{nombre}` para obtener y mostrar las características relevantes del Pokémon seleccionado.

3. **Filtro de Pokémon:**
   - [x] Implementa al menos un filtro para permitir al usuario filtrar los Pokémon por alguna característica, como tipo, habilidad, o generación.
   - [x] Utiliza los endpoints correspondientes en la documentación de PokeAPI para aplicar el filtro.
