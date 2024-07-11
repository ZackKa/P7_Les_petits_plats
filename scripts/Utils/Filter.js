export class Filter {
    constructor(app, datas, who) {
        this.app = app;
        this.datasAll = datas;
        this.datasSelected = [];
        this.who = who;
        this.init();
    }

    init() {
        this.showDatas();
    }

    showDatas() {
        const combo = document.getElementById(this.who);

        let listeSelectionnable = combo.querySelector(".filtre_selectionnable");

        listeSelectionnable.textContent = "";
        let i = 0;
        if (this.datasAll && this.datasAll.length > 0) {
            this.datasAll.forEach((data) => {
                const li = document.createElement("li")
                li.textContent = data
                li.id = this.who + '_' + i;
                li.style.display = "block"
                listeSelectionnable.appendChild(li);
                this.clickSelectionnable(li);
                i++;
            })
        }
        // console.log("appareils create", this.appareils)
    }

    clickSelectionnable(li) {

        li.addEventListener('click', () => {
            li.classList.add("clicked")
            this.searchText = li.textContent.toLowerCase()

            // ajoute le libelle dans une liste , pour gerer le filtrage des recettes
            switch (this.who) {
                case "appareil":
                    if(!this.app.datasSelectedAppareils.includes(this.searchText.toLowerCase())){
                    this.app.datasSelectedAppareils.push(this.searchText.toLowerCase());
                    }
                    console.log("datasSelectedAppareils", this.app.datasSelectedAppareils)
                    break;
                case "ingredient":
                    if(!this.app.datasSelectedIngredients.includes(this.searchText.toLowerCase())){
                    this.app.datasSelectedIngredients.push(this.searchText.toLowerCase());
                    }
                    console.log("datasSelectedIngredients", this.app.datasSelectedIngredients)
                    break;
                case "ustensile":
                    if(!this.app.datasSelectedUstensiles.includes(this.searchText.toLowerCase())){
                    this.app.datasSelectedUstensiles.push(this.searchText.toLowerCase());
                    }
                    console.log("datasSelectedUstensiles", this.app.datasSelectedUstensiles)
                    break;
            }
            this.app.haveFilter = true;

            //createTagSlectionné
            this.createSelectionne(li);

            //supprime le tag de la liste des selectionnable
            this.toogleTagSelectionnable(li);
            // Actualisation des recettes
            this.applyFilter();
        })

    }

    applyFilter() {
        // On combine les tableau d'appareils, ingredients et ustensiles séléectionnés dans datasSelected grâce à l'opérateur spread "..."
        // new Set() permet d'éliminer les doublons
        this.datasSelected = [...new Set([...this.app.datasSelectedAppareils, ...this.app.datasSelectedUstensiles, ...this.app.datasSelectedIngredients])];

        // On filtre les recettes en comparant chaque recette avec les éléments de this.datasSelected.
        this.app.filteredRecipes = this.app.allRecipes.filter(recipe => {
            // On vérifie si un appareil, un ingredient ou un ustensile correspond aux éléments de datasSelected
            return this.datasSelected.every(selectedItem => {
                return recipe.appliance.toLowerCase() === selectedItem ||
                    recipe.ustensils.some(ustensil => ustensil.toLowerCase() === selectedItem) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === selectedItem);
            });
        });
        //  Si une recette correspond à tous les éléments de datasSelected, elle est ajoutée à this.app.filteredRecipes.
        console.log("applyfilter", this.app.filteredRecipes);
        this.app.displayRecipes();
    }

    createSelectionne(li) {
        const combo = document.getElementById(this.who);
        let filtre_in = combo.querySelector(".filtre_selectionne")
        let filtre_out = document.querySelector(".filtre_out ul")

        li.textContent = li.textContent.charAt(0).toUpperCase() + li.textContent.slice(1);

        let li_in = document.createElement("li");
        li_in.classList.add("tag_actif", "in")
        li_in.id = li.id + "_in";
        li_in.textContent = li.textContent
        li_in.style.display = "flex";
        let li_out = document.createElement("li");
        li_out.classList.add("tag_actif", "out")
        li_out.id = li.id + "_out";
        li_out.textContent = li.textContent
        li_out.style.display = "flex";

        let supprime = document.createElement('i')
        supprime.classList.add('fa-solid', 'fa-xmark', 'delete_tag')
        let supprimeOut = document.createElement('i')
        supprimeOut.classList.add('fa-solid', 'fa-xmark', 'delete_tag')

        li_in.appendChild(supprime)
        li_out.appendChild(supprimeOut)
        filtre_in.appendChild(li_in);
        filtre_out.appendChild(li_out);

        //ajout des event remove
        this.clickSelectionne(li_in, li.id)
        this.clickSelectionne(li_out, li.id)
    }

    clickSelectionne(li, id) {
        let supprime = li.querySelector(".delete_tag")
        supprime.addEventListener("click", () => {
            this.li = li.textContent

            let liSectionnable = document.getElementById(id)
            liSectionnable.classList.remove("clicked")
            let liSectionneIn = document.getElementById(id + "_in")
            let liSectionneOut = document.getElementById(id + "_out")
            this.toogleTagSelectionnable(liSectionnable);
            liSectionneIn.remove();
            liSectionneOut.remove();

            // supprime l'element dans this.datasSelectedAppareils unstensiles et ingredients
            this.app.datasSelectedAppareils = this.app.datasSelectedAppareils.filter(data => data.toLowerCase() !== this.li.toLowerCase());
            this.app.datasSelectedUstensiles = this.app.datasSelectedUstensiles.filter(data => data.toLowerCase() !== this.li.toLowerCase());
            this.app.datasSelectedIngredients = this.app.datasSelectedIngredients.filter(data => data.toLowerCase() !== this.li.toLowerCase());
            
            this.applyFilter();

        })
    }

    toogleTagSelectionnable(li) {
        li.style.display = (li.style.display == "block") ? "none" : "block";
    }
}