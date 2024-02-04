function verificationChamps(){
    let nom=document.getElementById('nom');//on récupère tous les champs en variables avec leur id
    let prenom=document.getElementById('prenom');
    let email=document.getElementById('email');
    let sujet=document.getElementById('sujet');
    let message=document.getElementById('message');
    let bouton=document.getElementById('submit');
    let boolean=false;//on initialise un booléen
    if(nom.value!='' && prenom.value!='' && email.value!='' && sujet.value!='' && message.value!=''){
        boolean=true;
        bouton.removeAttribute('disabled');//on active le bouton en désactivant l'attribut disabled
        //alert("ok")
    }else{
        boolean=false;
        bouton.setAttribute('disabled','disabled');//sinon on le désactive en réattribuant la valeur disabled à l'attribut disabled
        //alert("pas ok")
    }
    return boolean;
}
let submit=document.getElementById('submit');
let prenom1=document.getElementById('prenom');
let nom1=document.getElementById('nom');
let email1=document.getElementById('email');
let sujet1=document.getElementById('sujet');
let message1=document.getElementById('message');

(prenom1 && nom1 && email1 && sujet1 && message1).addEventListener('blur',function(){
    verificationChamps();//On selectionne tous les champs et on appelle la fonction pour vérifier les champs à la perte du focus avec blur
});

//Pour executer le code dès que le DOM est chargé
$(document).ready(function(){
    //On ajoute au clic sur le bouton
    $('#submit').on('click',function(e){
        e.preventDefault();//On empêche le comportement par défaut du bouton
        let formData=new FormData($('#login')[0]);//On créé un objet formulaire avec les données et on instancie
        //il récupère les données du formulaire via son id
        //On peut maintenant faire la requête ajax
        $.ajax({
            url: 'formulaire.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success:function(message){
                if(message=='1'){
                    let retour=$('<br><span>🎉Message de succès🎉</span>').insertAfter('#submit');//On ecrit dans le DOM après le bouton submit
                    //On selectionne tous les champs avec leur id pour désactiver le formulaire en leur ajoutant l'attribut disabled avec une valeur disabled
                    $('#nom , #prenom , #email , #sujet , #message , #submit').attr('disabled','disabled');
                }else if(message=='2'){
                    let retour=$('<br><span>Nom requis😬</span>').insertAfter('#submit');
                    $('#nom').css('border','1px solid red');
                }else if(message=='3'){
                    let retour=$('<br><span>Prénom requis😮</span>').insertAfter('#submit');
                    $('#prenom').css('border','1px solid red');
                }else if(message=='4'){
                    let retour=$('<br><span>📧E-mail requis🙀</span>').insertAfter('#submit');
                    $('#email').css('border','1px solid red');
                }else if(message=='5'){
                    let retour=$('<br><span>Sujet requis😟</span>').insertAfter('#submit');
                    $('#sujet').css('border','1px solid red');
                }else if(message=='6'){
                    let retour=$('<br><span>Message requis😱</span>').insertAfter('#submit');
                    $('#message').css('border','1px solid red');//ah ah je pensais que ça allait fonctionner jusqu'au bout x)
                }                
            },
            error: function(xhr, status, error){
                let retour=$('<br><span>🦖 Oupsi ! Une erreur est survenue ! 🦖</span>').insertAfter('#submit');
            }
        });
    });
});
