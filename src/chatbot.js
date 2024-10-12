function initChatBot() {
    const chatToggleButton = document.createElement('button');
    chatToggleButton.id = 'chat-toggle';
    chatToggleButton.className = 'hidden md:flex fixed bottom-32 right-12 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600';
    chatToggleButton.innerHTML = '💬';

    const chatBox = document.createElement('div');
    chatBox.id = 'chat-box';
    chatBox.className = 'hidden fixed bottom-28 right-28 bg-white rounded-lg shadow-lg w-80 max-w-full';

    const chatHeader = document.createElement('div');
    chatHeader.className = 'p-4 border-b flex justify-between items-center';

    const chatTitle = document.createElement('h2');
    chatTitle.className = 'text-lg font-semibold';
    chatTitle.innerText = 'Чат-бот';

    const clearButton = document.createElement('button');
    clearButton.id = 'clear-btn';
    clearButton.className = 'ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600';
    clearButton.innerText = 'Очистить историю';

    chatHeader.appendChild(chatTitle);
    chatHeader.appendChild(clearButton);

    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'messages';
    messagesContainer.className = 'p-4 h-60 overflow-y-auto';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'p-4 border-t flex';

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.id = 'user-input';
    userInput.className = 'flex-grow p-2 border rounded';
    userInput.placeholder = 'Введите сообщение...';

    const audio = document.createElement('audio');
    audio.id = 'audio-file';
    audio.src = 'src/File/da.mp3'
    audio.type = 'audio/mpeg';
    document.body.appendChild(audio);

    const sendButton = document.createElement('button');
    sendButton.id = 'send-btn';
    sendButton.className = 'ml-2 p-2 bg-blue-500 text-white rounded';
    sendButton.innerText = 'Отправить';

    inputContainer.appendChild(userInput);
    inputContainer.appendChild(sendButton);
    chatBox.appendChild(chatHeader);
    chatBox.appendChild(messagesContainer);
    chatBox.appendChild(inputContainer);
    chatBox.appendChild(audio);

    const faqContainer = document.createElement('div');
    faqContainer.className = 'p-4 h-32 overflow-y-auto flex flex-wrap gap-2 border-t';

    const faqQuestions = [
        'Как сделать заказ?',
        'Как я могу вернуть товар?',
        'Сколько времени занимает доставка?',
        'Как узнать о наличии товара?',
        'Как получить скидку?',
        'Какие способы оплаты доступны?'
    ];

    // Создание кнопок для вопросов
    faqQuestions.forEach(question => {
        const faqButton = document.createElement('button');
        faqButton.className = 'p-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300';
        faqButton.innerText = question;

        // Обработчик событий для кнопок FAQ
        faqButton.addEventListener('click', () => {
            appendMessage(question, 'user');
            saveMessage(question, 'user');
            generateBotResponse(question).then(botResponse => {
                appendMessage(botResponse, 'bot');
                saveMessage(botResponse, 'bot');
            });
        });

        faqContainer.appendChild(faqButton);
    });

    chatBox.appendChild(faqContainer);
    document.body.appendChild(chatToggleButton);
    document.body.appendChild(chatBox);

    chatToggleButton.addEventListener('click', () => {
        chatBox.classList.toggle('hidden');
        loadChatHistory();
    });

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    clearButton.addEventListener('click', clearChatHistory);
    loadChatHistory();
}

// Функция для отправки сообщения
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const userMessage = inputField.value;

    if (userMessage.trim() === '') return;

    appendMessage(userMessage, 'user');
    saveMessage(userMessage, 'user');
    inputField.value = '';

    const botResponse = await generateBotResponse(userMessage);
    appendMessage(botResponse, 'bot');
    saveMessage(botResponse, 'bot');
}

// Функция для добавления сообщения
function appendMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = sender === 'user' ? 'text-right text-blue-600 mb-2' : 'text-left text-gray-600 mb-2';
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Функция для генерации ответа бота
async function generateBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    const audio = document.getElementById("audio-file")

    if (lowerCaseMessage.includes('как сделать заказ')) {
        return 'Вы можете сделать заказ, добавив товары в корзину и перейдя к оформлению.';
    } else if (lowerCaseMessage.includes('как вернуть товар')) {
        return 'Вы можете вернуть товар в течение 30 дней с момента покупки. Пожалуйста, ознакомьтесь с нашей политикой возврата.';
    } else if (lowerCaseMessage.includes('сколько времени занимает доставка')) {
        return 'Доставка обычно занимает 3-5 рабочих дней.';
    } else if (lowerCaseMessage.includes('пасхалочка') || lowerCaseMessage.includes('пасхалка') || lowerCaseMessage.includes('пасха')) {
        audio.play();
        return 'Ah shit, here we go again!';
    } else if (lowerCaseMessage.includes('как узнать о наличии товара')) {
        return 'Вы можете проверить наличие товара на странице товара или связавшись с нашей службой поддержки.';
    } else if (lowerCaseMessage.includes('как получить скидку')) {
        return 'Скидки доступны в разделе "Акции" на нашем сайте.';
    } else if (lowerCaseMessage.includes('какие способы оплаты доступны')) {
        return 'Мы принимаем различные способы оплаты, включая кредитные карты и PayPal.';
    } else if (lowerCaseMessage.includes('привет') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('прив') || lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('дороу') || lowerCaseMessage.includes('вечер в хату')) {
        return 'Приветствую вас. Чем могу помочь?';
    } else if (lowerCaseMessage.includes('пока') || lowerCaseMessage.includes('до свиданиия') || lowerCaseMessage.includes('прощай')) {
        return 'До свидания. Желаю доброго дня.';
    } else if (lowerCaseMessage.includes('пошел нахуй') || lowerCaseMessage.includes('пошёл нахуй') || lowerCaseMessage.includes('иди нахуй')) {
        return 'Сам пошёл нахуй долбоёб, иди учи уроки шкiла';
    } else {
        return 'Извините, я не понимаю вас. Могу помочь с чем-то еще?';
    }
}

// Функция для сохранения сообщения в localStorage
function saveMessage(message, sender) {
    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    history.push({ message, sender });
    localStorage.setItem('chatHistory', JSON.stringify(history));
}

// Функция для загрузки истории чата из localStorage
function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Очищаем текущее содержимое

    history.forEach(({ message, sender }) => {
        appendMessage(message, sender);
    });
}

// Функция для очистки истории чата
function clearChatHistory() {
    localStorage.removeItem('chatHistory');
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Очищаем текущее содержимое
}

// Инициализация чат-бота
initChatBot();
