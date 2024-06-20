export class RecetteModel {
    // On initialise les données du photographe
    constructor(datas) {
        this.id=datas.id;
        this.image=datas.image;
        this.name=datas.name;
        this.servings=datas.servings;
        this.ingredients=datas.ingredients;
        this.time=datas.time;
        this.description=datas.description;
        this.appliance=datas.appliance;
        this.ustensils=datas.ustensils;
        this.picture=`assets/Photos recettes/${this.image}`
    }
    // getFirstName(){
    //     // On divise le nom du photographe
    //     let data=this.name.split(' ');
    //     // On retourne le premier élément en remplaçant les tirets par des espaces
    //     return  data[0].replace("-"," ");
    // }
    
}