# hassio-webrecognition: add-on repository
Hassio addon for local face recognition web server based on the https://github.com/ageitgey/face_recognition progect. Currently there are docker images for armv7 and amd64 platforms. Tested on raspberry 3B +, raspberry 4B (Home Assistant Operating System.), Intel i3 linux Mint (Home Assistant Supervised and Home Assistant Operating System VM). In my setup, server worked on HAOS RPI 4B and was used for face recognition with a doorbell camera on the wicket. There was a Alexa notification, that anounse who the ring doorbell, and the automatic wicket lock opening in case of a known face. The recognition server interaction with the home assistant is implemented in Node-Red. Flow is given at the end of the article.

## Video illustration

Short video with subtitles about the doorbell with face recognition on Home Assistant.

[![Watch on youtube](https://img.youtube.com/vi/LVS-DfC3EMw/0.jpg)](https://youtu.be/LVS-DfC3EMw)

## Installing
In Hass.io, navigate to Supervisor > Add-on Store > Repositories and add 
`HASSIO Add-on: Web Recognition` repositorie

    https://github.com/AndreiRadchenko/hassio-webrecognition
    
The image file is about 1 GB, so it may take 10-15 minutes to download. Install and start addon.

## Local web server for realtime face recognition by http request or web interface. 

After add-on installation open the web browser and go to [Home Assistant IP]: 5001
A "Samples page" will open, and there you can upload photos of known faces. To select a photo, press `Select`. Enter a name in the adjacent field, in one word without spaces. For faster recognition I recommend using SD resolution images (1280x720 or 720x576 pix) and up to 60 kB size. Usually this image resolution gives the SD stream of the camera.
The server allows you to specify up to 5 "known" faces with names.

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

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/json-return.png" width="40%"></img>

Для того щоб продовжити тести натисніть стрілку назад в браузері.

## hassio-webrecognition: add-on restriction

Додаток має одне обмеження - фотографії облич і файл з закодованими данними облич не зберігаються після перезавантаження додатка чи Home Assistant.
Для того щоб позбутися цього обмеження, прошу підтримайте мене на ByMeACoffee чи PayPal, напишіть мені, і я поділюся інструкцією, як встановити сервер розпізнавання облич в HAOS що зберігає дані облич при перезавантаженні. Ваша підтримка дуже потрібна мені і моїй родині в умовах війни в Україні. 
Якщо проект зацікавить велику аудіторію, я продовжу роботу по інтегріції проекта в Home assistant, наприклад додам вивід результату в mqtt, чи створю сенсор розпізнавання.

<a href="https://www.buymeacoffee.com/andriiradchenko" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>   <a href="https://www.paypal.com/donate/?hosted_button_id=QB42TMLKZ7KAE" target="_blank"><img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/paypal-donation.png" alt="Donate with PayPal" style="height: 60px !important;width: 250px !important;" ></a>

## Взаємодія серверу розпізнавання облич webrecognition з Home Assistant. 

Взаємодія серверу розпізнавання облич з Home Assistant реалізована в Node-Red. Ви можете імпортувати наведене мною flow в Node-Red. Flow "Cam Dorbell"
у відповідь на подію натиснення кнопки дзвінка робить знімок з камери дзвінка і надсилає його через `html request node` серверу webrecognition. 
Після обробки сервером, результат розпізнавання у вигляді JSON об'єкта надходить в `html request node` і в залежності від його вмісту `Switch node` 
відкриває чи не відкриває хвіртку і встановлює сенсори input_boolean. Ці сенсори я використовую в Alexa rutine для оголошення голосовим помічником хто саме подзвонив в дзвінок.


Node-Red Flow            |  Description
-------------------------|-------------------------
[Cam_Doorbell.json](https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/flows.json) | Flow for interaction with Home Assistant  

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-flow.jpg" width="100%"></img> 

Для роботи flow вам необхідно встановити в Node-Red [node-red-contrib-image-tools](https://flows.nodered.org/node/node-red-contrib-image-tools) і 
[node-red-contrib-image-output](https://flows.nodered.org/node/node-red-contrib-image-output). 
Для цього відкрийте Node-Red -> Settings (Sandwich button) -> Manage palette. Перейдіть на вкладку Install і в полі пошуку введіть "image-tools". 
Встановіть цей `node`, потім так само встановіть `node` "image-output"

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/install-image-tool.jpg" width="49%"></img> <img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-contrib-image-output.jpg" width="49%"></img>

Відредагуйте node "Doorbell button" у відповідності з сенсором що буде активувати автоматизацію.
Для налаштування з якої камери потрібно робити знімок, відредагуйте node "API". Для більш швидкої обробки зображень потрібно брати SD відео потік.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-API-cam-thumbnail.jpg" width="100%"></img>

Якщо сервер розпізнавання webrecognition запущений на тому ж сервері що і Node-Red, node "http request" можна залишити без змін. Інакше потрібно
відредагувати IP адресу сервера webrecognition в полі URL вузла "http request" : [webrecognition_IP]:5001/test

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-send-http.jpg" width="100%"></img>

Якщо сервер webrecognition повертає JSON об'єкт з пустим полем "faces_list", node "Switch" активує свій перший вихід, що просто виводить 
JSON об'єкт в Debug. Якщо поле "faces_list" не пусте, значить перед дверима стоїть хтось із знайомим обличчям і "Switch" передає управління на другий
вихід. До нього підключений node що відчиняє хвіртку. Node "Switch" також активує вихід що містить ім'я впізнаної людини, до якого підключені nodes 
що активують відповідні `input_boolean`

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-switch.jpg" width="100%"></img>
