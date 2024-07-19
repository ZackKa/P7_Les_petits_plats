export class RecetteModel {
    // On initialise les données des recettes
    constructor(datas) {
        this.id = datas.id;
        this.image = datas.image;
        this.name = datas.name;
        this.servings = datas.servings;
        this.ingredients = datas.ingredients;
        this.time = datas.time;
        this.description = datas.description;
        this.appliance = datas.appliance;
        this.ustensils = datas.ustensils;
        this.picture = `assets/Photos_recettes/${this.image}`
    }
}