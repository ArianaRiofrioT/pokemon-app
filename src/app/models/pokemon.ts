export interface Pokemon {
  id: number;
  nombre: string;
  tipos: string[];
  imagen: string | null;
  hp: number;
  ataque: number;
}

export interface TypeDetail {
  name: string;
  damageRelations: {
    doubleDamageFrom: { name: string }[];
    halfDamageFrom: { name: string }[];
  };
}

export interface MoveDetail {
  name: string;
  power: number | null;
  accuracy: number | null;
  type: { name: string };
}