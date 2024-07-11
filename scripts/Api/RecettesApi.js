
import { Api } from "./Api.js";

export class RecettesApi extends Api {
    constructor(url) {
        super(url); // Appel constructor parent(url)
    }

    async getAll() {
        //La méthode getAll utilise getDatas pour récupérer toutes les données.
        let datas = await this.getDatas();
        //Elle retourne les données.
        return datas;
    }
}