import { RecetteTemplate } from "./RecetteTemplate.js";
import { RecetteModel } from "../Models/RecetteModel.js";

export class RecipesTemplate {
    // On initialise la propriété
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
        if(this.recipes.length > 9){
            totalRecettes.textContent = this.recipes.length + " recettes"
        }else{
            totalRecettes.textContent = this.recipes.length + " recette"
        }
    }

}