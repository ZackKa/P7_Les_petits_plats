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

                // instance ajouter avant c'etait dans fitlers
        this.filterAppareils=new Filter(this.app,this, this.appareils, "appareil");
        this.filterIngredients=new Filter(this.app,this, this.ingredients, "ingredient");
        this.filterUstensils=new Filter(this.app,this, this.ustensiles, "ustensile");

        // this.getAppareils()
        // console.log("filterss", this.appareils);
        // new Filter(this.app, this.app.appareils, "appareil");
        // this.getIngredients()
        // console.log("ingredients filters", this.ingredients)
        // new Filter(this.app, this.app.ingredients, "ingredient");
        // this.getUstensiles()
        // console.log("getUstensiles filters", this.ustensiles)
        // new Filter(this.app, this.app.ustensiles, "ustensile");

        this.searchSecondary()
    }

    getDatas(){
        this.getAppareils()
        this.getIngredients()
        this.getUstensiles()
    }

    updateFilter(datas) {
        this.appareils=[];
        this.ingredients=[];
        this.ustensiles=[];
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
        let datas = this.app.haveMainFilter ? this.app.filteredRecipes : this.app.allRecipes;
        console.log("Recette pour la récupérations des appareils",datas)
        datas.forEach((data) => {
            this.appareils.push(data.appliance.toLowerCase()) // On ajoute la data en miniscule dans le tableau
            this.appareils = new Set(this.appareils) //On évite les doublons
            this.appareils = [...this.appareils] // Et renvoie un tableau

        })
        // console.log("appareils filt", this.appareils)
    }

    getIngredients() {
        let datas = this.app.haveMainFilter ? this.app.filteredRecipes : this.app.allRecipes;
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
        let datas = this.app.haveMainFilter ? this.app.filteredRecipes : this.app.allRecipes;
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

    // Fonctionne mais saladier retourne appareil et ustensiles
    applySecondaryFilter() {
        // On combine les tableau d'appareils, ingredients et ustensiles séléectionnés dans datasSelected grâce à l'opérateur spread "..."
        // new Set() permet d'éliminer les doublons
       // this.datasSelected = [...new Set([...this.app.datasSelectedAppareils, ...this.app.datasSelectedUstensiles, ...this.app.datasSelectedIngredients])];
        let datas=[];
        if (this.app.haveMainFilter) 
            datas= this.app.filteredRecipes ;
        else
            datas= this.app.allRecipes   ;


        if(this.app.datasSelectedAppareils.length==0 && this.app.datasSelectedUstensiles.length==0 && this.app.datasSelectedIngredients.length==0) {
            console.log("PAS de FILTRE")
            // this.getAppareils();
            // this.filterAppareils.updateData(this.appareils) ;
            // this.app.filteredRecipes=[]
            this.app.haveSecondaryFilter=false;
            
            return;
        }
        // else{
        //     this.app.haveSecondaryFilter=true;
        // }
        this.app.haveSecondaryFilter=true;


        this.app.filteredRecipes = datas.filter(recipe => {
            // On vérifie si un appareil, un ingredient ou un ustensile correspond aux éléments de datasSelected
            return this.app.datasSelectedAppareils.every(selectedItem => {
                return recipe.appliance.toLowerCase().includes(selectedItem) ;
            });
        });
        this.app.filteredRecipes =  this.app.filteredRecipes.filter(recipe => {
            // On vérifie si un appareil, un ingredient ou un ustensile correspond aux éléments de datasSelected
            return this.app.datasSelectedUstensiles.every(selectedItem => {
                return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(selectedItem));
            });
        });
        this.app.filteredRecipes =  this.app.filteredRecipes.filter(recipe => {
            // On vérifie si un appareil, un ingredient ou un ustensile correspond aux éléments de datasSelected
            return this.app.datasSelectedIngredients.every(selectedItem => {
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedItem));
            });
        });
        //  Si une recette correspond à tous les éléments de datasSelected, elle est ajoutée à this.app.filteredRecipes.
        console.log("applySecondaryFilter", this.app.filteredRecipes);
        console.log("main filter",this.app.haveMainFilter)            
        console.log("second filter",this.app.haveSecondaryFilter)


        // this.getAppareils();
        // this.filterAppareils.updateData(this.appareils) ;

    }
}