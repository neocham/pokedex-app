const BASE_URL = 'https://pokeapi.co/api/v2';

export class ApiClient {
  static async get(endpoint) {
    const url = `${BASE_URL}/${endpoint}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }
}
