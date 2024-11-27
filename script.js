document.addEventListener("DOMContentLoaded", function () {
    // Accordion funkcionalitāte
    var acc = document.getElementsByClassName("accordion-button");
    if (acc.length > 0) {
        for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    this.classList.remove("active");
                } else {
                    content.style.display = "block";
                    this.classList.add("active");
                }
            });
        }
    }

    // Puzles gabali un to pozīcijas
    const puzzlePieces = [
        { id: 'piece_0_0', position: [0, 0] },
        { id: 'piece_0_1', position: [1, 0] },
        { id: 'piece_0_2', position: [2, 0] },
        { id: 'piece_0_3', position: [3, 0] },
        { id: 'piece_0_4', position: [4, 0] },
        { id: 'piece_1_0', position: [0, 1] },
        { id: 'piece_1_1', position: [1, 1] },
        { id: 'piece_1_2', position: [2, 1] },
        { id: 'piece_1_3', position: [3, 1] },
        { id: 'piece_1_4', position: [4, 1] },
        { id: 'piece_2_0', position: [0, 2] },
        { id: 'piece_2_1', position: [1, 2] },
        { id: 'piece_2_2', position: [2, 2] },
        { id: 'piece_2_3', position: [3, 2] },
        { id: 'piece_2_4', position: [4, 2] },
    ];

    let startTime;
    let endTime;

    // Funkcija, lai izveidotu puzles gabaliņus
    function createPuzzlePieces() {
        const piecesContainer = document.getElementById('pieces-container');
        puzzlePieces.forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('puzzle-piece');
            pieceElement.draggable = true;
            pieceElement.id = piece.id;
            pieceElement.setAttribute('data-id', piece.id);

            // Gabaliņa attēls no attiecīgā faila
            pieceElement.style.backgroundImage = `url('puzzle.png')`;
            pieceElement.style.backgroundSize = '500px 500px';  // Iestatīt attēla izmērus (ja tas ir 500x500 pikseļi)
            pieceElement.style.backgroundPosition = `-${piece.position[0] * 100}px -${piece.position[1] * 100}px`;  // Pozīcija atkarībā no gabala

            // Pievieno velkšanas funkcionalitāti
            pieceElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', piece.id);
            });

            piecesContainer.appendChild(pieceElement);
        });
    }

    // Funkcija, lai izveidotu drop laukumu
    function createDropArea() {
        const dropArea = document.getElementById('drop-area');
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();  // Lai pieļautu elementa nometināšanu
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const pieceId = e.dataTransfer.getData('text');
            const droppedPiece = document.querySelector(`[data-id="${pieceId}"]`);

            // Pārvieto puzles gabaliņu uz drop laukumu
            const rect = dropArea.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            droppedPiece.style.position = 'absolute';
            droppedPiece.style.left = `${offsetX - 50}px`;
            droppedPiece.style.top = `${offsetY - 50}px`;

            // Pievieno gabalu drop laukuma iekšpusē
            dropArea.appendChild(droppedPiece);

            // Pārbaudīt, vai visi gabali ir vietās
            checkPuzzleCompletion();
        });
    }

    // Funkcija, lai pārbaudītu, vai puzle ir salikta
    function checkPuzzleCompletion() {
        let allCorrect = true;
        puzzlePieces.forEach(piece => {
            const pieceElement = document.getElementById(piece.id);
            const rect = pieceElement.getBoundingClientRect();
            const dropAreaRect = document.getElementById('drop-area').getBoundingClientRect();

            // Salīdzina gabaliņa pozīciju ar pareizo pozīciju
            if (Math.abs(rect.left - dropAreaRect.left + piece.position[0] * 100) > 50 ||
                Math.abs(rect.top - dropAreaRect.top + piece.position[1] * 100) > 50) {
                allCorrect = false;
            }
        });

        // Ja visi gabali ir pareizi novietoti, uzrāda paziņojumu
        if (allCorrect) {
            endTime = new Date().getTime();
            const timeTaken = (endTime - startTime) / 1000;
            document.getElementById('result-container').style.display = 'block';
            document.getElementById('time-result').textContent = `Tavs laiks: ${timeTaken} sekundes`;
        }
    }

    // Funkcija, lai sāktu puzles spēli
    function startPuzzleGame() {
        startTime = new Date().getTime();
        createPuzzlePieces();
        createDropArea();
    }

    // Sākam spēli, kad lapa ir ielādēta
    startPuzzleGame();

    // Funkcija, lai saglabātu rezultātu
    function saveResult() {
        const username = document.getElementById('username').value;
        alert(`Rezultāts saglabāts, ${username}!`);
    }

    // Pievienojam spēles rezultāta saglabāšanas funkcionalitāti
    window.saveResult = saveResult;
});