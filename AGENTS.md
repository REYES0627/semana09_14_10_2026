# AGENTS.md

## Project

Angular 22.2.2 single-page app with SSR (server-side rendering), generated via Angular CLI. Component class is `App` (not `AppComponent`). Uses signals and modern Angular conventions. App con dos APIs: PokeAPI y Rick and Morty API.

## Commands

- **Dev server**: `ng serve` (or `npm start`) — http://localhost:4200
- **Build**: `ng build` — production build with `outputMode: "server"`
- **Run SSR server**: `npm run serve:ssr:semana9` (or `node dist/semana9/server/server.mjs`) — requires a prior `ng build`. Listens on `PORT` env var or defaults to 4000.
- **Test**: `ng test` — runs **Vitest** (not Karma/Jasmine). No `karma.conf.js` exists; don't look for one.

## Routes

| Ruta | Descripcion |
|------|-------------|
| `/` | Home: dos mitades verticales con imagenes y botones de navegacion |
| `/pokemon` | Pokedex con PokeAPI (busqueda, filtro por tipo, paginacion, modal con detalles) |
| `/rick-morty` | Grid de personajes de Rick and Morty API (paginacion) |

## Architecture

- **SSR is enabled** — `src/server.ts` is the Express server entry. `app.config.server.ts` merges SSR providers into the base `app.config.ts`.
- **No custom schematics** — the `schematics: {}` block in `angular.json` is empty; default Angular CLI generators apply.
- **No lint tooling configured** — no ESLint config or `lint` script exists. Prettier is a devDependency but has no `.prettierrc` file.

## Estructura del proyecto

- La estructura debe ser **componente-servicio**.
- Las interfaces van en `interfaces/`.
- En los componentes, el archivo HTML debe estar separado del TS (usar `templateUrl`, no `template` inline).

## APIs

### PokeAPI (`/pokemon`)

- `PokemonService` (`src/app/pokemon.service.ts`) maneja todas las llamadas a PokeAPI v2.
- Filtros: busqueda por nombre (client-side) + filtro por tipo (AND).
- Paginacion: 20 tarjetas por pagina con botones Anterior/Siguiente.
- Modal: click en tarjeta abre detalle con stats, sonido (Web Audio API) y color representativo del tipo.
- Componentes: `PokemonList` (contenedor), `PokemonCard` (tarjeta), `PokemonDetail` (modal).
- Tema: fondo oscuro morado/dorado, tarjetas semi-transparentes.

### Rick and Morty API (`/rick-morty`)

- `RickMortyService` (`src/app/rick-morty.service.ts`) consume `https://rickandmortyapi.com/api/character`.
- Grid con cards: imagen, nombre, especie, estado, genero.
- Paginacion: 20 por pagina con botones Anterior/Siguiente.
- Tema: fondo futurista verde/azul (portal espacial), tarjetas con bordes verdes brillantes.
