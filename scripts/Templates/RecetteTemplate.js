export class RecetteTemplate {
    // On initialise la propriété
    constructor(recetteModel) {
        this.recetteModel = recetteModel;
    }

    render() {
        //Créer 1 card pour 1 Recette
        const article = document.createElement('article');
        article.setAttribute("data-id", this.recetteModel.id)

        const divImg = document.createElement('div')
        divImg.classList.add("div_img")
        article.appendChild(divImg)

        const pdivImg = document.createElement('p')
        pdivImg.classList.add("time_img")
        pdivImg.textContent = this.recetteModel.time + "min"
        divImg.appendChild(pdivImg)

        const img = document.createElement('img')
        img.setAttribute("src", this.recetteModel.picture)
        img.setAttribute("alt", this.recetteModel.name)
        divImg.appendChild(img);
        
        const divContent = document.createElement('div')
        divContent.classList.add("div_content")
        article.appendChild(divContent)

        const nomRecette = document.createElement('h2')
        nomRecette.textContent = this.recetteModel.name
        divContent.appendChild(nomRecette)

        const description = document.createElement('div')
        description.classList.add("description")
        divContent.appendChild(description)

        const h3Description = document.createElement('h3')
        h3Description.textContent = "RECETTE"
        description.appendChild(h3Description)

        const pDescription = document.createElement('p')
        pDescription.textContent = this.recetteModel.description
        description.appendChild(pDescription)

        const ingredients = document.createElement('div')
        ingredients.classList.add("ingredients_content")
        divContent.appendChild(ingredients)

        const h3ingredients = document.createElement('h3')
        h3ingredients.textContent = "INGRÉDIENTS"
        ingredients.appendChild(h3ingredients)

        const detailIngredients = document.createElement('div')
        detailIngredients.classList.add("ingredients_detail")
        ingredients.appendChild(detailIngredients)

        this.recetteModel.ingredients.forEach((data) => {

            const detailIngredientsContent = document.createElement('div')
            detailIngredientsContent.classList.add("ingredients_detail_content")
            detailIngredients.appendChild(detailIngredientsContent)

            const pTitreDetail = document.createElement('p')
            pTitreDetail.textContent = data.ingredient
            pTitreDetail.classList.add("titre_ingredients_detail")
            detailIngredientsContent.appendChild(pTitreDetail)

            const pDetail = document.createElement('p')
            pDetail.classList.add("ingredients_quantity")
            if(data.unit){
                pDetail.textContent = data.quantity + " " + data.unit
            }else{
                pDetail.textContent = data.quantity
            }
            detailIngredientsContent.appendChild(pDetail)
        })

        return (article);
    }
}