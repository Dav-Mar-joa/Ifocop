function monOutil(elements){
    function init(elements){
        this.balises = document.querySelectorAll(elements);
    }
    const outil = new init(elements)

    outil.actions=outil.__proto__;

    outil.actions.masquer=function(){

        for (let i=0;i<this.balises.length;i++){
            
            this.balises[i].style.display="none"
    }
};

outil.actions.texte=function(leTexte){

    for (let i=0;i<this.balises.length;i++){
        
        this.balises[i].innerText=leTexte
        }
};
    return outil;
}

// console.log("dans outils")