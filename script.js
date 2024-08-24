document.addEventListener('DOMContentLoaded', () => {
    const titleText = document.getElementById('title-text');
    const playButton = document.getElementById('play-button');
    const randomizeButton = document.getElementById('randomize-button');
    const titleCard = document.getElementById('title-card');

    // Default words for each collection
    const defaultCollections = [
        ["Tiger", "Dolphin", "Kangaroo", "Panda", "Eagle"],
        ["Red", "Blue", "Green", "Yellow", "Purple"],
        ["Pizza", "Apple", "Carrot", "Ice cream", "Sandwich"],
        ["Car", "Truck", "Bicycle", "Airplane", "Boat"],
        ["Tree", "Flower", "Mountain", "River", "Sun"]
    ];

    let collections = [];
    let currentCollection = 0;
    let currentWordIndex = -1;
    let allWordsDisplayed = false;

    function initializeCollections() {
        collections = [
            getInputWords('collection-1-input', defaultCollections[0]),
            getInputWords('collection-2-input', defaultCollections[1]),
            getInputWords('collection-3-input', defaultCollections[2]),
            getInputWords('collection-4-input', defaultCollections[3]),
            getInputWords('collection-5-input', defaultCollections[4])
        ];
        allWordsDisplayed = false;
    }

    function getInputWords(inputId, defaultWords) {
        const inputElement = document.getElementById(inputId);
        const inputWords = inputElement.value.split(',').map(item => item.trim()).filter(item => item !== '');
        return inputWords.length ? inputWords : defaultWords;
    }

    function displayNextWord() {
        if (collections[currentCollection].length === 0) return;

        currentWordIndex++;
        if (currentWordIndex >= collections[currentCollection].length) {
            currentCollection++;
            currentWordIndex = -1;
            if (currentCollection >= collections.length) {
                titleText.textContent = 'Congratulations!';
                titleText.style.color = 'black';
                titleCard.removeEventListener('click', displayNextWord);
                return;
            }
            setTimeout(() => {
                titleText.textContent = `0${currentCollection + 1}`;
                titleText.style.color = 'black';
            }, 500);
            return;
        }

        titleText.textContent = collections[currentCollection][currentWordIndex];
        titleText.style.color = 'red';
    }

    function startCollection() {
        titleText.textContent = 'Welcome!';
        titleText.style.color = 'black';

        setTimeout(() => {
            initializeCollections();
            titleText.textContent = `0${currentCollection + 1}`;
            titleText.style.color = 'black';
            titleCard.addEventListener('click', displayNextWord);
        }, 1000);
    }

    function randomizeWords() {
        const collection = collections[currentCollection];
        for (let i = collection.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [collection[i], collection[j]] = [collection[j], collection[i]];
        }
    }

    // Prepopulate input fields with default values on page load
    document.getElementById('collection-1-input').value = defaultCollections[0].join(', ');
    document.getElementById('collection-2-input').value = defaultCollections[1].join(', ');
    document.getElementById('collection-3-input').value = defaultCollections[2].join(', ');
    document.getElementById('collection-4-input').value = defaultCollections[3].join(', ');
    document.getElementById('collection-5-input').value = defaultCollections[4].join(', ');

    playButton.addEventListener('click', startCollection);
    randomizeButton.addEventListener('click', randomizeWords);
});
