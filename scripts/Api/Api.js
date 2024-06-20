//La classe Api a un constructeur qui prend une URL en paramètre et l'assigne à this.url
export class Api {
    constructor(url) {
        this.url=url;
    }
    
    async getDatas() {
        // La méthode getDatas effectue une requête fetch vers l'URL spécifiée
        return fetch(this.url)
        //Elle utilise then pour traiter la réponse en la convertissant en JSON
            .then((res)=>res.json())
        //En cas d'erreur, elle utilise catch
            .catch((error)=>console.log('Erreur lors de la récupération des données de l\'api' + error));
    }
}