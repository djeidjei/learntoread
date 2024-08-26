document.addEventListener('DOMContentLoaded', () => {
    const titleText = document.getElementById('title-text');
    const playButton = document.getElementById('play-button');
    const resetButton = document.getElementById('reset-button');
    const titleCard = document.getElementById('title-card');
    const randomizeToggle = document.getElementById('randomize-toggle');
    const subtext = document.querySelector('.subtext');

    let isGameActive = false;

    const defaultCollections = [
        { title: "Animals", words: ["Tiger", "Dolphin", "Kangaroo", "Panda", "Eagle"] },
        { title: "Colors", words: ["Red", "Blue", "Green", "Yellow", "Purple"] },
        { title: "Foods", words: ["Pizza", "Apple", "Carrot", "Ice cream", "Sandwich"] },
        { title: "Vehicles", words: ["Car", "Truck", "Bicycle", "Airplane", "Boat"] },
        { title: "Nature", words: ["Tree", "Flower", "Mountain", "River", "Sun"] }
    ];

    let collections = [];
    let currentCollection = 0;
    let currentWordIndex = 0;
    let isRandomized = false;

    function prepopulateInputs() {
        document.getElementById('collection-1-input').value = defaultCollections[0].words.join(', ');
        document.getElementById('collection-2-input').value = defaultCollections[1].words.join(', ');
        document.getElementById('collection-3-input').value = defaultCollections[2].words.join(', ');
        document.getElementById('collection-4-input').value = defaultCollections[3].words.join(', ');
        document.getElementById('collection-5-input').value = defaultCollections[4].words.join(', ');
    }

    function initializeCollections(prepopulate = true) {
        if (prepopulate) {
            prepopulateInputs();
        }

        collections = [
            { title: "01", words: getInputWords('collection-1-input') },
            { title: "02", words: getInputWords('collection-2-input') },
            { title: "03", words: getInputWords('collection-3-input') },
            { title: "04", words: getInputWords('collection-4-input') },
            { title: "05", words: getInputWords('collection-5-input') }
        ].filter(collection => collection.words.length > 0);

        if (collections.length === 0) {
            alert("Please enter at least 1 word.");
            return false;
        }

        if (isRandomized) {
            collections.forEach(collection => {
                shuffleArray(collection.words);
            });
        }

        return true;
    }

    function getInputWords(inputId) {
        const inputElement = document.getElementById(inputId);
        const inputWords = inputElement?.value.split(',').map(item => item.trim()).filter(item => item !== '');
        return inputWords.length ? inputWords : [];
    }

    function displayNextWord() {
        if (!isGameActive) {
            return; // Stop any further action if the game is not active
        }

        if (currentCollection >= collections.length) {
            displayCongratulations();
            titleCard.removeEventListener('click', displayNextWord);
            isGameActive = false; // Ensure the game is inactive
            return;
        }

        if (currentWordIndex === 0) {
            titleText.textContent = collections[currentCollection].title;
            titleText.style.color = 'blue';
            titleText.style.fontSize = '7rem';  // Large font size
            titleText.style.lineHeight = '7.7rem'; // Slightly larger line height to prevent cropping
            titleText.style.paddingBottom = '0.2rem'; // Add padding to prevent cropping
            currentWordIndex++;
        } else {
            const currentWord = collections[currentCollection].words[currentWordIndex - 1];
            titleText.textContent = currentWord;
            titleText.style.color = 'red';
            titleText.style.fontSize = '6rem';  // Large font size
            titleText.style.lineHeight = '6.7rem'; // Slightly larger line height to prevent cropping
            titleText.style.paddingBottom = '0.2rem'; // Add padding to prevent cropping
            currentWordIndex++;

            if (currentWordIndex > collections[currentCollection].words.length) {
                currentCollection++;
                currentWordIndex = 0;
            }
        }
    }

    function displayCongratulations() {
        titleText.textContent = 'Congratulations!';
        titleText.style.color = 'black';
        titleText.style.fontSize = '4rem';  // Large font size
        titleText.style.lineHeight = '7.7rem'; // Slightly larger line height to prevent cropping
        titleText.style.paddingBottom = '0.2rem'; // Add padding to prevent cropping
    }

    function startCollection() {
        subtext.style.display = 'none';

        const initializationSuccess = initializeCollections(false);
        if (initializationSuccess) {
            currentWordIndex = 0;
            currentCollection = 0;
            isGameActive = true;

            titleCard.addEventListener('click', displayNextWord);
            displayNextWord();
        }
    }

    function resetApp() {
        document.getElementById('collection-1-input').value = '';
        document.getElementById('collection-2-input').value = '';
        document.getElementById('collection-3-input').value = '';
        document.getElementById('collection-4-input').value = '';
        document.getElementById('collection-5-input').value = '';

        titleText.textContent = 'Welcome!';
        subtext.style.display = 'block';

        currentCollection = 0;
        currentWordIndex = 0;
        titleCard.removeEventListener('click', displayNextWord);
        isGameActive = false;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    randomizeToggle.addEventListener('change', (e) => {
        isRandomized = e.target.checked;
    });

    playButton.addEventListener('click', startCollection);
    resetButton.addEventListener('click', resetApp);

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && isGameActive) {
            event.preventDefault();
            displayNextWord();
        }
    });

    prepopulateInputs();

    titleText.textContent = 'Welcome!';
    titleText.style.color = 'black';
    titleText.style.fontSize = '7rem';  // Large font size
    titleText.style.lineHeight = '7.7rem'; // Slightly larger line height to prevent cropping
    titleText.style.paddingBottom = '0.2rem'; // Add padding to prevent cropping
    subtext.style.fontSize = '2.5rem'; // Increased subtext size
});
