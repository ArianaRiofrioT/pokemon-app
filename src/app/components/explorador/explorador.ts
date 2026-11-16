import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, TypeDetail, MoveDetail } from '../../models/pokemon';

@Component({
  selector: 'app-explorador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorador.html',
  styleUrl: './explorador.css'
})
export class Explorador {
  private readonly servicio = inject(PokemonService);

  public pokemon = signal<Pokemon | null>(null);
  public tipoInfo = signal<TypeDetail | null>(null);
  public movimientoInfo = signal<MoveDetail | null>(null);

  public cargando = signal(false);
  public error = signal('');

  public async buscar(nombreOId: string): Promise<void> {
    const texto = nombreOId.trim();
    if (!texto) {
      this.error.set('Escribe un nombre o id.');
      return;
    }

    this.cargando.set(true);
    this.error.set('');
    this.pokemon.set(null);
    this.tipoInfo.set(null);
    this.movimientoInfo.set(null);

    try {
      // Endpoint 1: Consulta del Pokémon principal
      const resultado = await this.servicio.buscarPokemon(texto);
      this.pokemon.set(resultado);

      // Endpoint 2: Consulta el tipo principal del Pokémon (ej. fire, water)
      if (resultado.tipos.length > 0) {
        const tipoRes = await this.servicio.consultarTipo(resultado.tipos[0]);
        this.tipoInfo.set(tipoRes);
      }

      // Endpoint 3: Consulta un movimiento táctico (ej. tackle)
      const movRes = await this.servicio.consultarMovimiento('tackle');
      this.movimientoInfo.set(movRes);

    } catch (err: any) {
      this.error.set(
        err instanceof HttpErrorResponse && err.status === 404
          ? 'No existe ese Pokémon en PokéAPI.'
          : 'No fue posible consultar los recursos.'
      );
    } finally {
      this.cargando.set(false);
    }
  }
}