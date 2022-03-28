# hassio-webrecognition: add-on repository
Hassio addon for local face recognition web server створений на основі проекту https://github.com/ageitgey/face_recognition. На даний час є докер образи для платформ armv7 amd64. Перевірено працює на raspberry 3B+, raspberry 4B (Home Assistant Operating System.), intel i3 linux Mint (Home Assistant Supervised and Home Assistant Operating System VM). У мене особисто сервер працював в HAOS RPI 4B і використовувався для розпізнавання облич камерою дзвінка на хвіртці. Було також налаштовано сповіщення через алексу хто саме подзвонив в дзвінок і автоматичне відкриття замка хвіртки в разі знайомого обличчя. Взаємодія сервера розпізнавання з home assistant реалізована в Node-Red. Flow наведено в кінці статті.

## Video illustration

Коротке відео з субтитрами про дзвінок з розпізнаванням облич на НА. !ЗРОБИТИ АНГЛІЙСЬКІ СУБТИТРИ І ПОСИЛАННЯ НА ПРОЕКТ І ДОНАТ

Watch on youtube:

[![Watch on youtube](https://img.youtube.com/vi/LVS-DfC3EMw/0.jpg)](https://youtu.be/LVS-DfC3EMw)

## Installing
In Hass.io, navigate to Supervisor > Add-on Store > Repositories and add 
`HASSIO Add-on: Web Recognition` repositorie

    https://github.com/AndreiRadchenko/hassio-webrecognition
    
Файл образа важить біля 1 ГБ, тож для скачування може знадобитись 10-15 хвилин. Install and start addon.    

## Local web server for realtime face recognition by http request or web interface. 

Після встановлення аддону в веббраузері перейдіть за адресою [Home Assistant IP]:5001
Відкриється сторінка "Samples page" на якій ви можете завантажити фото знайомих облич. Для вибору фото натисніть `Select`. В сусідньому полі введіть ім'я, одним словом без пробілів. Для більш швидкого розпізнавання
я рекомендую використовувати зображення SD resolution (1280x720 or 720x576 pix) and up to 60 kB size. Звичайно таке зображення дає SD потік камери.
Сервер дозволяє задати до 5 "знайомих" облич з іменами. 

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/chose_foto_name.jpg" width="70%"></img> 

Після додавання зображень знайомих облич і редагування імен натисніть кнопку `Upload` внизу сторінки. Це призведе до запуску скрипта,який 
закодує обличчя в вигляді векторних масивів і запише ці масиви в файл. Процес кодування на rpi3 B+ може зайняти до 1 хв часу, в залежності від кількості облич і розміру фійлів зображень. Запуск скрипта кодування облич запускається також натисненням `Enter`.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/upload.jpg" width="70%"></img> 

Після завершення роботи скрипту кодування відобразиться сторінка Completed. На ній натисніть кнопу `Return to the main page`.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/completed-page.png" width="70%"></img> 

Для перевірки розпізнавання облич, натисніть на кнопку `Taste Page` вгорі сторінки задавання знайомих облич

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/sample_page.jpg" width="70%"></img> 

На сторінці Test Page натисніть кнопку `Select` для вибору тестового фотопортрету

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/test-page.jpg" width="70%"></img> 

Обравши фото, натисніть кнопку `Upload`

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/test_page.png" width="70%"></img>

Якщо дотримуватись моїх рекомендацій щодо розміру зображень, то розпізнавання обличчя займає до 3 с на rpi 3 B+. Після завершення
обробки сервер видасть json структуру що відобразиться браузером

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/json-return.png" width="50%"></img>
