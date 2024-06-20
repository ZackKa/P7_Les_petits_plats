export class Search {
    constructor(app) {
        this.app=app
    }

    init() {
        let searchHTML=document.getElementById('site-search');
        searchHTML.addEventListener('keyup', e=>{
            let searchText=this.checkSearch(e);
            if(searchText==false) return;
            this.applyFilter(searchText);
        });
    }

    checkSearch(e) {
        let searchText=e.target.value.trim().toLowerCase();

        if(searchText.length <=3) {
            this.app.haveFilter=false;
            this.app.displayRecipes();
            return false;
        } 

        this.app.haveFilter=true;
        return searchText;

    }

    applyFilter(searchText) {
        this.app.filteredRecipes= this.app.allRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchText)
        )
        console.log(this.app.filteredRecipes)
        this.app.displayRecipes();
    }
}