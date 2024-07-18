export class Filter {
    constructor(app,filters, datas, who) {
        this.app=app;
        this.filters = filters;
        this.datasAll = datas;
        this.who = who;
        this.init();
    }

    init() {
        this.showDatas();
    }

    updateData(datas) {
        this.datasAll = datas;
        this.showDatas();
    }

    showDatas() {
        const combo = document.getElementById(this.who);
        let listeSelectionnable = combo.querySelector(".filtre_selectionnable");

        listeSelectionnable.textContent = "";
        this.datasAll.sort(); // afficher par ordre alphabétique
        let i = 0;
        if (this.datasAll && this.datasAll.length > 0) {
            this.datasAll.forEach((data) => {
                
                const li = document.createElement("li")
                li.style.display = "block"

                switch(this.who) {
                    case "appareil":
                        console.log(data+" est present",this.app.datasSelectedAppareils.includes(data))
                        if (this.app.datasSelectedAppareils.includes(data)) {
                            li.classList.add("clicked")
                            li.style.display = "none"
                        }
                    break;
                    case "ingredient":
                        console.log(data+" est present",this.app.datasSelectedIngredients.includes(data))
                        if (this.app.datasSelectedIngredients.includes(data)) {
                            li.classList.add("clicked")
                            li.style.display = "none"
                        }
                    break;
                    case "ustensile":
                        console.log(data+" est present",this.app.datasSelectedUstensiles.includes(data))
                        if (this.app.datasSelectedUstensiles.includes(data)) {
                            li.classList.add("clicked")
                            li.style.display = "none"
                        }
                    break;
                }

                li.textContent = data
                li.id = this.who + '_' + i;
                listeSelectionnable.appendChild(li);
                this.clickSelectionnable(li);
                i++;
            })
        }
        // console.log("appareils create", this.appareils)
    }

    clickSelectionnable(li) {
        li.addEventListener('click', () => {
            console.log("li clicked")
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

            //createTagSlectionné
            this.createSelectionne(li);

            //supprime le tag de la liste des selectionnable
            this.toogleTagSelectionnable(li);
            // Actualisation des recettes
            this.app.applyFilter();
        })

    }


    // Banane et les 2 saladier fonctionne pas mais accumulation filtre fonctionne
    // applyFilter() {
        
    //     this.app.filteredRecipes = this.app.allRecipes.filter(recipe => {
    //         return this.app.datasSelectedAppareils.every(appareil => recipe.appliance.toLowerCase().includes(appareil)) &&
    //             this.app.datasSelectedUstensiles.every(ustensil => recipe.ustensils.map(u => u.toLowerCase()).includes(ustensil.toLowerCase())) &&
    //             this.app.datasSelectedIngredients.every(ingredient => recipe.ingredients.map(i => i.ingredient.toLowerCase()).includes(ingredient.toLowerCase()));
    //             // this.app.datasSelectedIngredients.some(ingredient => recipe.ingredients.some(i => i.ingredient.toLowerCase().includes(ingredient.toLowerCase()))); // clic appareil et ustensiles = 0
    //     });
    //     //  Si une recette correspond à tous les éléments de datasSelected, elle est ajoutée à this.app.filteredRecipes.
    //     console.log("applyfilter", this.app.filteredRecipes);
    //     this.app.displayRecipes();
    // }    

    // accumulation fonctionne et banane aussi mais saladier focntionne pas
    // applyFilter() {
    //     if (this.app.datasSelectedAppareils.length === 0 && this.app.datasSelectedUstensiles.length === 0 && this.app.datasSelectedIngredients.length === 0) {
    //         this.app.filteredRecipes = this.app.allRecipes;
    //     } else {
    //         let filteredRecipes = this.app.allRecipes.filter(recipe => {
    //             const appareilMatch = this.app.datasSelectedAppareils.length === 0 || this.app.datasSelectedAppareils.some(appareil => recipe.appliance.toLowerCase().includes(appareil));
    //             const ustensileMatch = this.app.datasSelectedUstensiles.length === 0 || this.app.datasSelectedUstensiles.every(ustensil => recipe.ustensils.map(u => u.toLowerCase()).includes(ustensil.toLowerCase()));
    //             const ingredientMatch = this.app.datasSelectedIngredients.length === 0 || this.app.datasSelectedIngredients.some(ingredient => recipe.ingredients.some(i => i.ingredient.toLowerCase().includes(ingredient.toLowerCase())));
    
    //             return appareilMatch && ustensileMatch && ingredientMatch;
    //         });
    
    //         if (this.app.datasSelectedAppareils.length > 0 || this.app.datasSelectedUstensiles.length > 0 || this.app.datasSelectedIngredients.length > 0) {
    //             this.app.filteredRecipes = filteredRecipes;
    //         } else {
    //             this.app.filteredRecipes = this.app.allRecipes;
    //         }
    //     }
    
    //     console.log("applyfilter", this.app.filteredRecipes);
    //     this.app.displayRecipes();
    // }

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
            if(liSectionnable) {
                liSectionnable.classList.remove("clicked")
                this.toogleTagSelectionnable(liSectionnable);
            }
            let liSectionneIn = document.getElementById(id + "_in")
            let liSectionneOut = document.getElementById(id + "_out")
            liSectionneIn.remove();
            liSectionneOut.remove();

            // supprime l'element dans this.datasSelectedAppareils unstensiles et ingredients
            // this.app.datasSelectedAppareils = this.app.datasSelectedAppareils.filter(data => data.toLowerCase() !== this.li.toLowerCase());
            // this.app.datasSelectedUstensiles = this.app.datasSelectedUstensiles.filter(data => data.toLowerCase() !== this.li.toLowerCase());
            // this.app.datasSelectedIngredients = this.app.datasSelectedIngredients.filter(data => data.toLowerCase() !== this.li.toLowerCase());

            switch (this.who) {
                case "appareil":
                    this.app.datasSelectedAppareils = this.app.datasSelectedAppareils.filter(data => data.toLowerCase() !== this.li.toLowerCase());
                    break;
                case "ingredient":
                    this.app.datasSelectedIngredients = this.app.datasSelectedIngredients.filter(data => data.toLowerCase() !== this.li.toLowerCase());
                    break;
                case "ustensile":
                    this.app.datasSelectedUstensiles = this.app.datasSelectedUstensiles.filter(data => data.toLowerCase() !== this.li.toLowerCase());
                    break;
            }
            
            console.log("ici")
            console.log("ici 2",this.app.filteredRecipes)
            this.app.applyFilter();

        })
    }

    toogleTagSelectionnable(li) {
        li.style.display = (li.style.display == "block") ? "none" : "block";
    }
}