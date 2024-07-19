import { Filter } from "./Filter.js";

export class Filters {
    constructor(app) {
        this.app = app;

        this.appareils = []
        this.ingredients = []
        this.ustensiles = []
    }

    init() {
        this.openTags()
        this.getDatas()

        this.filterAppareils = new Filter(this.app, this, this.appareils, "appareil");
        this.filterIngredients = new Filter(this.app, this, this.ingredients, "ingredient");
        this.filterUstensils = new Filter(this.app, this, this.ustensiles, "ustensile");

        this.searchSecondary()
    }

    getDatas() {
        this.getAppareils()
        this.getIngredients()
        this.getUstensiles()
    }

    updateFilter(datas) {
        this.appareils = [];
        this.ingredients = [];
        this.ustensiles = [];
        this.getDatas();

        this.filterAppareils.updateData(this.appareils)
        this.filterIngredients.updateData(this.ingredients)
        this.filterUstensils.updateData(this.ustensiles)
    }

    openTags() {
        const btn_list = document.querySelectorAll(".btn_list")
        btn_list.forEach(btn => {
            btn.addEventListener("click", (event) => {
                this.eventOpenTags(event)
            })
        })
    }

    // Gére l'ouverture de la liste des filtres
    eventOpenTags(event) {
        let divParent = event.target.closest("div");
        let liste_filtre = divParent.querySelector(".liste_filtre")
        let icon = divParent.querySelector(".icon")
        let search_tag = divParent.querySelector(".search_tag")
        let filtre_selectionnable = divParent.querySelector(".filtre_selectionnable")
        let filtre_selectionne = divParent.querySelector(".filtre_selectionne")
        if (liste_filtre.classList.contains("filtre_open")) {
            icon.classList.add("rotate")
            liste_filtre.classList.remove("filtre_open");
            setTimeout(function () {
                search_tag.style.display = "none"
                filtre_selectionnable.style.display = "none"
                filtre_selectionne.style.display = "none"
            }, 200);
        } else {
            icon.classList.remove("rotate")
            liste_filtre.classList.add("filtre_open");
            search_tag.style.display = "block"
            filtre_selectionnable.style.display = "block"
            filtre_selectionne.style.display = "flex"
        }
    }

    searchSecondary() {
        let searchClick = document.querySelectorAll(".search_tag")
        searchClick.forEach(input => {
            input.addEventListener('keyup', e => {
                let divGeneral = e.target.closest(".filtre");
                let divFiltre = divGeneral.querySelector("div");
                let searchText = this.checkSearchSecondary(e); // return les caractères entrés 
                if (searchText == false) return;
                this.filteredArray = this.getFilteredArray(divFiltre, searchText); // returne un tableau avec filtre correspondant à la recherche
                this.hideNonMatchingItems(divFiltre, searchText);
            });
        })
    }

    // Cache les filtres non correspondant
    hideNonMatchingItems(divFiltre, searchText) {
        const listeSelectionnable = divFiltre.querySelector(".filtre_selectionnable");
        const selectableItems = listeSelectionnable.querySelectorAll("li");

        if (searchText.length > 3) {
            selectableItems.forEach(selectableItem => {
                if (!this.filteredArray.includes(selectableItem.textContent.toLowerCase())) {
                    selectableItem.style.display = "none";
                } else {
                    if (selectableItem.classList.contains("clicked")) {
                        selectableItem.style.display = "none";
                    } else {
                        selectableItem.style.display = "block";
                    }
                }
            })
        } else {
            selectableItems.forEach(selectableItem => {
                if (selectableItem.classList.contains("clicked")) {
                    selectableItem.style.display = "none";
                } else {
                    selectableItem.style.display = "block";
                }
            });
        }
    }

    checkSearchSecondary(e) {
        let searchText = e.target.value.trim().toLowerCase();
        return searchText;
    }

    // Filtre les tableau en fonction du texte entré
    getFilteredArray(divFiltre, searchText) {
        if (divFiltre.classList.contains("appareils")) {
            return this.appareils.filter(item => item.toLowerCase().includes(searchText));
        } else if (divFiltre.classList.contains("ingredients")) {
            return this.ingredients.filter(item => item.toLowerCase().includes(searchText));
        } else if (divFiltre.classList.contains("ustensiles")) {
            return this.ustensiles.filter(item => item.toLowerCase().includes(searchText));
        }
    }

    // Récupére les appareils
    getAppareils() {
        let datas = this.app.haveMainFilter ? this.app.filteredRecipes : this.app.allRecipes;
        datas.forEach((data) => {
            this.appareils.push(data.appliance.toLowerCase()) // On ajoute la data en miniscule dans le tableau
            this.appareils = new Set(this.appareils) //On évite les doublons
            this.appareils = [...this.appareils] // Et renvoie un tableau

        })
    }

    getIngredients() {
        let datas = this.app.haveMainFilter ? this.app.filteredRecipes : this.app.allRecipes;
        datas.forEach((data) => {
            data.ingredients.forEach((data) => {
                this.ingredients.push(data.ingredient.toLowerCase())
                this.ingredients = [...new Set(this.ingredients)]
            })
        })
    }

    getUstensiles() {
        let datas = this.app.haveMainFilter ? this.app.filteredRecipes : this.app.allRecipes;
        datas.forEach((data) => {
            data.ustensils.forEach((data) => {
                this.ustensiles.push(data.toLowerCase())
                this.ustensiles = [...new Set(this.ustensiles)]
            })
        })
    }

    applySecondaryFilter() {
        let datas = [];
        // On initialise datas en fonction de haveMainFilter
        if (this.app.haveMainFilter)
            datas = this.app.filteredRecipes;
        else
            datas = this.app.allRecipes;

        // Si les 3 tableau sont vide, pas de filtre secondaire
        if (this.app.datasSelectedAppareils.length == 0 && this.app.datasSelectedUstensiles.length == 0 && this.app.datasSelectedIngredients.length == 0) {
            this.app.haveSecondaryFilter = false;
            return;
        }
        this.app.haveSecondaryFilter = true;

        // Les recettes filtrées sont mises à jour en fonction des filtres secondaires sélectionnés 
        this.app.filteredRecipes = datas.filter(recipe => {
            // Pour chaque recette, on vérifie si l'appareil de la recette correspond à au moins un des appareils sélectionnés.
            return this.app.datasSelectedAppareils.every(selectedItem => {
                return recipe.appliance.toLowerCase().includes(selectedItem);
            });
        });
        this.app.filteredRecipes = this.app.filteredRecipes.filter(recipe => {
            return this.app.datasSelectedUstensiles.every(selectedItem => {
                return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedItem));
            });
        });
        this.app.filteredRecipes = this.app.filteredRecipes.filter(recipe => {
            return this.app.datasSelectedIngredients.every(selectedItem => {
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedItem));
            });
        });
    }
}