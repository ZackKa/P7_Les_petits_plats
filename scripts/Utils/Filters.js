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
        this.showDatas()
        // this.getAppareils()
        // console.log("filterss", this.appareils);
        new Filter(this.app, this.appareils, "appareil");
        // this.getIngredients()
        // console.log("ingredients filters", this.ingredients)
        new Filter(this.app, this.ingredients, "ingredient");
        // this.getUstensiles()
        // console.log("getUstensiles filters", this.ustensiles)
        new Filter(this.app, this.ustensiles, "ustensile");

        this.searchSecondary()
    }

    showDatas(){
        this.getAppareils()
        this.getIngredients()
        this.getUstensiles()
    }

    openTags() {
        const btn_list = document.querySelectorAll(".btn_list")
        btn_list.forEach(btn => {
            btn.addEventListener("click", (event) => {
                this.eventOpenTags(event)
            })
        })
    }

    eventOpenTags(event) {
        let divParent = event.target.closest("div");
        // console.log("div", divParent)
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
                // console.log("champ actuel", input)
                let divGeneral = e.target.closest(".filtre");
                let divFiltre = divGeneral.querySelector("div");
                let searchText = this.checkSearchSecondary(e); // return les caractères entrés 
                if (searchText == false) return;
                // console.log("searc", searchText)
                this.filteredArray = this.getFilteredArray(divFiltre, searchText); // returne un table avec filtre correspondant à la recherche
                this.hideNonMatchingItems(divFiltre, searchText);

                console.log("tabeleau filtrer", this.filteredArray);
            });
        })
    }

    hideNonMatchingItems(divFiltre, searchText) {
        const listeSelectionnable = divFiltre.querySelector(".filtre_selectionnable");
        const selectableItems = listeSelectionnable.querySelectorAll("li");

        if(searchText.length >3){
            selectableItems.forEach(selectableItem => {
                if (!this.filteredArray.includes(selectableItem.textContent.toLowerCase())) {
                    selectableItem.style.display = "none";
                }else {
                    if(selectableItem.classList.contains("clicked")){
                        selectableItem.style.display = "none";
                    }else{
                        selectableItem.style.display = "block";
                    }
                }
            })
        }else{
            selectableItems.forEach(selectableItem => {
                console.log("clicked",selectableItem.classList.contains("clicked"))
                if(selectableItem.classList.contains("clicked")){
                    console.log("ici")
                    selectableItem.style.display = "none";
                }else{
                    selectableItem.style.display = "block";
                }
            });
        }
    }

    checkSearchSecondary(e) {
        let searchText = e.target.value.trim().toLowerCase();
        return searchText;
    }

    getFilteredArray(divFiltre, searchText) {
        // console.log("gget",divFiltre.classList.contains("ingredients"))
        if (divFiltre.classList.contains("appareils")) {
            // console.log("gget appar",divFiltre)
            return this.appareils.filter(item => item.toLowerCase().includes(searchText));
        } else if (divFiltre.classList.contains("ingredients")) {
            // console.log("gget ingred",divFiltre)
            return this.ingredients.filter(item => item.toLowerCase().includes(searchText));
        } else if (divFiltre.classList.contains("ustensiles")) {
            return this.ustensiles.filter(item => item.toLowerCase().includes(searchText));
        }
    }

    getAppareils() {
        // console.log("data filtre", this.app.allRecipes)
        let datas = this.app.haveFilter ? this.app.filteredRecipes : this.app.allRecipes;
        console.log("FILTERS DATA",this.app.filteredRecipes)

        datas.forEach((data) => {
            this.appareils.push(data.appliance.toLowerCase()) // On ajoute la data en miniscule dans le tableau
            this.appareils = new Set(this.appareils) //On évite les doublons
            this.appareils = [...this.appareils] // Et renvoie un tableau

        })
        // console.log("appareils filt", this.appareils)
    }

    getIngredients() {
        let datas = this.app.haveFilter ? this.app.filteredRecipes : this.app.allRecipes;

        datas.forEach((data) => {
            // this.ingredients.push(data.ingredients)
            data.ingredients.forEach((data) => {
                // console.log("data ingredient", data.ingredient)
                this.ingredients.push(data.ingredient.toLowerCase())
                this.ingredients = [...new Set(this.ingredients)]
            })
        })
        // console.log("ingredient filt", this.ingredients)
    }

    getUstensiles() {
        let datas = this.app.haveFilter ? this.app.filteredRecipes : this.app.allRecipes;

        datas.forEach((data) => {
            // console.log("data ustensiles", data.ustensils)
            // this.ustensiles.push(data.ustensils)
            data.ustensils.forEach((data) => {
                // console.log("data ingredient", data)
                this.ustensiles.push(data.toLowerCase())
                this.ustensiles = [...new Set(this.ustensiles)]
            })
        })
        // console.log("ustensiles filt", this.ustensiles)
    }
}