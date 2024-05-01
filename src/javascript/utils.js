export const animateCards = () => {
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Fonction pour animer les cartes lors du défilement
const animateCardsOnScroll = () => {
    const cards = document.querySelectorAll('.cardGame');
    cards.forEach((card) => {
        if (isInViewport(card)) {
            card.classList.add('animate'); // Ajoutez la classe pour déclencher l'animation
        } else {
            card.classList.remove('animate'); // Supprimez la classe si la carte n'est plus visible
        }
    });
};

// Écoutez l'événement de défilement pour déclencher l'animation
window.addEventListener('scroll', animateCardsOnScroll);
}


