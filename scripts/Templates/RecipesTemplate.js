import { RecetteTemplate } from "./RecetteTemplate.js";
import { RecetteModel } from "../Models/RecetteModel.js";

export class RecipesTemplate {
    // On initialise la propriété photographeModel
    constructor(recipes) {
        this.recipes = recipes;
    }

    render() {
        let html=document.getElementById("recettes");
        html.textContent='';

        // On fait une boucle des recettes
        this.recipes.forEach((data) => {
            let recetteModel=new RecetteModel(data);
            let recetteTemplate=new RecetteTemplate(recetteModel);
            html.appendChild(recetteTemplate.render());
        })

        this.totalRecettes()
    }

    totalRecettes(){
        let totalRecettes = document.querySelector(".total_recettes p")
        totalRecettes.textContent = this.recipes.length + " reccettes"
    }

}