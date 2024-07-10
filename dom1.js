document.addEventListener('DOMContentLoaded', () => {

    // liste des articles dans le panier 

    const cartItems = [
        { id: 1, price: 10, name: "Glace", quantity: 0, isLiked: false },
        { id: 2, price: 20, name: "Shoes", quantity: 0, isLiked: false },
        { id: 3, price: 30, name: "PC", quantity: 0, isLiked: false }
    ]
    // conteneur pour les articles du panier 
    const cartContainer = document.getElementById('cart-items')

    // Element Html pour afficher le prix total
    const totalPriceDiv = document.getElementById("total-price")

    // fonction pour afficher les articles du panier

    function afficheArticles() {

      if (cartContainer) {
       cartContainer.innerHTML = " "
        for (let i = 0; i < cartItems.length; i++) {
            // créer une div pour chaque article 
            const itemRow = document.createElement('div');
            itemRow.className = 'col-md-12 mb-3'  // AJouter des classes Bootstrap pour le styling;
            // Ajouter le contenu HTML de chaque article
            itemRow.innerHTML = `
    <div class="card">
       <div class="card-body">
           <div class="row">
              <div class="col-md-4"> ${cartItems[i].name}</div>
              <div class="col-md-2"> ${cartItems[i].price} DT </div>
              <div class="col-md-2">
               <button class="btn btn-danger btn-sm minus-btn" data-id="${cartItems[i].id}">
                -
               </button>
                <span class="quantity"> ${cartItems[i].quantity}</span>
                <button class="btn btn-secondary btn-sm plus-btn" data-id="${cartItems[i].id}">
                +
               </button>
              </div>

              <div class="col-md-2">
               <button class="btn btn-danger btn-sm delete-btn" data-id="${cartItems[i].id}">
               Supprimer
               </button>
              </div>

              <div class="col-md-2">
               <button class="like-button ${cartItems[i].isLiked ? "liked" : ""}" data-id="${cartItems[i].id}">
                &#x2661  
               </button>
              </div>
           </div>
        </div>
    </div>
    `;
            cartContainer?.appendChild(itemRow) // Ajouter l'article au div container
        }
      }

        updateTotalePice();  // Mettre ajour le prix Total
    }

    // fonction pour mettre a jour le prix total 
    function updateTotalePice() {
        let totalPrice = 0;

        for (let i = 0; i < cartItems.length; i++) {
            let produit = cartItems[i];
            totalPrice = totalPrice + (produit.quantity * produit.price)
        }
        if (totalPriceDiv) {

            totalPriceDiv.textContent = totalPrice || 0
        }
    }

    // Ajouter des Gestionnaire d'evenements pour les buttons
    cartContainer?.addEventListener('click', function (event) {
        var target = event.target  // Elément cliqué 
        console.log("target", target)
        var itemId = target.getAttribute('data-id') // ID de l'article

        let indexItem = -1;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id == itemId) {
                indexItem = i;
                break;
                }
                }
                
        if (target.classList.contains('plus-btn')) {
          // si le button + est cliqué , augmenter la quantité
          cartItems[indexItem].quantity +=1;
        } else if ( target.classList.contains('minus-btn') ) {
          // si le button - est cliqué , diminuer la quantité
          if (cartItems[indexItem].quantity > 0 ) {
              cartItems[indexItem].quantity -= 1 ;
          }
        } else if (target.classList.contains('delete-btn')) {
            // si le button cliqué est supprimer , supprimer l'article (produit) de la tableau
           cartItems.splice(indexItem,1)
        } else {
            // si le button cliqué est like , change l'attribut isLiked = !isLiked
            cartItems[indexItem].isLiked =  !cartItems[indexItem].isLiked 
        } 

        afficheArticles()  // reafficher les articles
    }

)

    afficheArticles()  // afficher les articles au chargement de page inital
}) 
