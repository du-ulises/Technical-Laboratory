import axios from "axios";
import { environment } from "../environments/environment";

export async function getPokemonTypes() {
  return await axios.get(`${environment.apiUrl}/type/`);
}

export async function getAllPokemon(limit) {
  return await axios.get(`${environment.apiUrl}/pokemon?limit=${limit}`);
}

export async function getPokemonById(id) {
  return await axios.get(`${environment.apiUrl}/pokemon/${id}`);
}

export async function getPokemonDescription(id) {
  return await axios.get(`${environment.apiUrl}/pokemon-species/${id}`);
}

export async function getPokemonTypeById(id) {
  return await axios.get(`${environment.apiUrl}/type/${id}`);
}

export async function badRequest() {
  return await axios.get(`${environment.apiUrl}/bad/`);
}