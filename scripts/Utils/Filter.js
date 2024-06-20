export class Filter {
    constructor(datas) { 
        this.datas=datas
    }

    render(){
        this.appareilsListe()
        this.createAppareil()
    }

    appareilsListe(){
        this.appareils = []
        console.log("data filtre", this.datas.allRecipes)
        this.datas.allRecipes.forEach((data) => {
            this.appareils.push(data.appliance)
            this.appareils = new Set(this.appareils)
            this.appareils = [...this.appareils]

            // this.appareils = [...new Set(this.appareils)]
        })
        console.log("elem filt", this.appareils)
    }

    createAppareil(){
        const listeElement = document.querySelector(".appareils")
        let listeAppareil = listeElement.querySelector(".filtre_selectionnable");

        this.appareils.forEach((data) => {
            const liAppareil = document.createElement("li")
            liAppareil.textContent = data
            listeAppareil.appendChild(liAppareil)
        })

        // const liAppareil = document.createElement("li")
        // liAppareil.textContent = this.appareils
        // listeAppareil.appendChild(liAppareil)
        console.log("liste appareil", listeAppareil)
    }
}