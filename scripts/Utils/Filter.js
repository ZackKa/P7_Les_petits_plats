export class Filter {
    constructor(app, filters, datas, who) {
        this.app = app;
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

                switch (this.who) {
                    case "appareil":
                        // Si la data est dans le tableau datasSelectedAppareils, on applique le style none
                        if (this.app.datasSelectedAppareils.includes(data)) {
                            li.classList.add("clicked")
                            li.style.display = "none"
                        }
                        break;
                    case "ingredient":
                        if (this.app.datasSelectedIngredients.includes(data)) {
                            li.classList.add("clicked")
                            li.style.display = "none"
                        }
                        break;
                    case "ustensile":
                        if (this.app.datasSelectedUstensiles.includes(data)) {
                            li.classList.add("clicked")
                            li.style.display = "none"
                        }
                        break;
                }

                li.textContent = data
                // On donne un identifiant unique grâce à this.who et l'index
                li.id = this.who + '_' + i;
                listeSelectionnable.appendChild(li);
                this.clickSelectionnable(li);
                i++;
            })
        }
    }

    // Ecoute le click du li
    clickSelectionnable(li) {
        li.addEventListener('click', () => {
            li.classList.add("clicked")
            // On récupère le texte de li et le passe en minuscule
            this.searchText = li.textContent.toLowerCase()

            // En fonction de this.who, on verifie si this.searchText n'est pas déjà présent dans le tableau, sinon on l'ajoute
            switch (this.who) {
                case "appareil":
                    if (!this.app.datasSelectedAppareils.includes(this.searchText.toLowerCase())) {
                        this.app.datasSelectedAppareils.push(this.searchText.toLowerCase());
                    }
                    break;
                case "ingredient":
                    if (!this.app.datasSelectedIngredients.includes(this.searchText.toLowerCase())) {
                        this.app.datasSelectedIngredients.push(this.searchText.toLowerCase());
                    }
                    break;
                case "ustensile":
                    if (!this.app.datasSelectedUstensiles.includes(this.searchText.toLowerCase())) {
                        this.app.datasSelectedUstensiles.push(this.searchText.toLowerCase());
                    }
                    break;
            }

            //On crée les tags sélectionnés correspondants
            this.createSelectionne(li);

            //Supprime le tag de la liste des selectionnable
            this.toogleTagSelectionnable(li);
            // Actualisation des recettes
            this.app.applyFilter();
        })

    }

    // Crée les tags
    createSelectionne(li) {
        const combo = document.getElementById(this.who);
        let filtre_in = combo.querySelector(".filtre_selectionne")
        let filtre_out = document.querySelector(".filtre_out ul")

        // Permets de mettre la première lettre en majuscules
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

    // Ajoute la fonction de suppression
    clickSelectionne(li, id) {
        let supprime = li.querySelector(".delete_tag")
        supprime.addEventListener("click", () => {
            this.li = li.textContent

            let liSectionnable = document.getElementById(id)
            if (liSectionnable) {
                liSectionnable.classList.remove("clicked")
                this.toogleTagSelectionnable(liSectionnable);
            }
            let liSectionneIn = document.getElementById(id + "_in")
            let liSectionneOut = document.getElementById(id + "_out")
            liSectionneIn.remove();
            liSectionneOut.remove();

            // En fonction de this who, on retire l'élément du tableau correspondant
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
            this.app.applyFilter();
        })
    }
    // Gére le display
    toogleTagSelectionnable(li) {
        li.style.display = (li.style.display == "block") ? "none" : "block";
    }
}