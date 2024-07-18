export class Search {
    constructor(app) {
        this.app=app
    }

    init() {
        let searchHTML=document.getElementById('site-search');
        searchHTML.addEventListener('keyup', e=>{
            this.searchText=this.checkSearch(e);
            if(this.searchText==false) return;
            this.app.applyFilter();
        });
    }

    checkSearch(e) {
        let searchText=e.target.value.trim().toLowerCase();

        if(searchText.length <=3) {
            this.app.haveMainFilter=false;
            console.log("main filter",this.app.haveMainFilter)            
            console.log("second filter",this.app.haveSecondaryFilter)
            this.app.applyFilter();
            return false;
        } 

        this.app.haveMainFilter=true;
         
        console.log("main filter",this.app.haveMainFilter) 
        return searchText;
    }

    // applyFilter(searchText) {
    //     this.app.filteredRecipes= this.app.allRecipes.filter(recipe => 
    //         recipe.name.toLowerCase().includes(searchText) || 
    //         recipe.appliance.toLowerCase().includes(searchText) || 
    //         recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchText)) ||
    //         recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText))
    //     )
    //     this.app.displayRecipes(searchText);
    // }

    // applyFilter(searchText) {
    //     // (this.app.filteredRecipes.length>0)
    //     // (this.app.datasSelectedAppareils.length>0 || this.app.datasSelectedUstensiles.length>0 || this.app.datasSelectedIngredients.length>0)
    //     console.log("long",this.filteredRecipes.length)
    //     if(this.app.datasSelectedAppareils.length>0 && this.app.datasSelectedUstensiles.length>0 && this.app.datasSelectedIngredients.length>0){
    //         this.app.filteredRecipes = this.app.filteredRecipes.filter(recipe => 
    //             recipe.name.toLowerCase().includes(searchText) || 
    //             recipe.appliance.toLowerCase().includes(searchText) || 
    //             recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchText)) ||
    //             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText))
    //         );
    //         this.app.displayRecipes(searchText)
    //     }else{
    //         // console.log("appppppp",this.app.filteredRecipes)
    //         this.app.filteredRecipes= this.app.allRecipes.filter(recipe => 
    //             recipe.name.toLowerCase().includes(searchText) || 
    //             recipe.appliance.toLowerCase().includes(searchText) || 
    //             recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchText)) ||
    //             recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText))
    //         )
    //         this.app.displayRecipes(searchText);
    //     }
    // }

    applyMainFilter() {
        if (this.app.datasSelectedAppareils.length === 0 && this.app.datasSelectedUstensiles.length === 0 && this.app.datasSelectedIngredients.length === 0) {
            this.app.filteredRecipes = this.app.allRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(this.searchText) || 
                recipe.appliance.toLowerCase().includes(this.searchText) || 
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(this.searchText)) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.searchText))
            );
        } else {
            this.app.filteredRecipes= this.app.filteredRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(this.searchText) || 
                recipe.appliance.toLowerCase().includes(this.searchText) || 
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(this.searchText)) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.searchText))
            )
        }
       

        
    }
}