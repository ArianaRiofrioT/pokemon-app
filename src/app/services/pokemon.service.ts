import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Pokemon, TypeDetail, MoveDetail } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly base = 'https://pokeapi.co/api/v2';
  private cache = new Map<string, any>();

  // Endpoint 1: Consulta de Pokémon (/pokemon/{name})
  async buscarPokemon(entrada: string): Promise<Pokemon> {
    const clave = entrada.trim().toLowerCase();
    if (!clave) throw new Error('Escribe un nombre o id de Pokémon.');
    
    if (this.cache.has(clave)) {
      return this.cache.get(clave);
    }

    const url = `${this.base}/pokemon/${encodeURIComponent(clave)}/`;
    const datos: any = await firstValueFrom(this.http.get(url));

    const pokemon: Pokemon = {
      id: datos.id,
      nombre: datos.name,
      tipos: datos.types.map((e: any) => e.type.name),
      imagen: datos.sprites.front_default,
      hp: datos.stats[0].base_stat,
      ataque: datos.stats[1].base_stat
    };

    this.cache.set(String(pokemon.id), pokemon);
    this.cache.set(pokemon.nombre, pokemon);
    return pokemon;
  }

  // Endpoint 2: Consulta de Tipos (/type/{name}) para debilidades y relaciones
  async consultarTipo(tipo: string): Promise<TypeDetail> {
    const clave = `type_${tipo.trim().toLowerCase()}`;
    if (this.cache.has(clave)) return this.cache.get(clave);

    const url = `${this.base}/type/${encodeURIComponent(tipo.toLowerCase())}/`;
    const datos: any = await firstValueFrom(this.http.get(url));

    const resultado: TypeDetail = {
      name: datos.name,
      damageRelations: {
        doubleDamageFrom: datos.damage_relations.double_damage_from,
        halfDamageFrom: datos.damage_relations.half_damage_from
      }
    };

    this.cache.set(clave, resultado);
    return resultado;
  }

  // Endpoint 3: Consulta de Movimientos (/move/{name}) para poder y precisión
  async consultarMovimiento(movimiento: string): Promise<MoveDetail> {
    const clave = `move_${movimiento.trim().toLowerCase()}`;
    if (this.cache.has(clave)) return this.cache.get(clave);

    const url = `${this.base}/move/${encodeURIComponent(movimiento.toLowerCase())}/`;
    const datos: any = await firstValueFrom(this.http.get(url));

    const resultado: MoveDetail = {
      name: datos.name,
      power: datos.power,
      accuracy: datos.accuracy,
      type: datos.type
    };

    this.cache.set(clave, resultado);
    return resultado;
  }
}