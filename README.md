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

After add-on installation open the web browser and go to [Home Assistant IP]: 5001.
A "Samples page" will open, and there you can upload photos of known faces. To select a photo, press `Select`. Enter a name in the adjacent field, in one word without spaces. For faster recognition I recommend using SD resolution images (1280x720 or 720x576 pix) and up to 60 kB size. Usually this image resolution gives the SD stream of the camera.
The server allows you to specify up to 5 "known" faces with names.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/chose_foto_name.jpg" width="70%"></img> 

After adding images of known faces and editing names, click the `Upload` button at the bottom of the page. This will run a script that
encodes faces as vector arrays and writes these arrays to a file. The encoding process on rpi3 B + can take up to 1 minute, depending on the number of faces and the size of the image files. The face encoding script also started by pressing `Enter`.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/upload.jpg" width="70%"></img> 

When the encoding script is finish, the Completed page will be displayed. Click the `Return to the main page` button.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/completed-page.png" width="70%"></img> 

For the face recognition test, click on the `Test Page` button at the top of the Samples page.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/sample_page.jpg" width="70%"></img> 

On the Test Page, click the `Select` button to select a test portrait.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/test-page.jpg" width="70%"></img> 

After selecting a photo, click the `Upload` button.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/test_page.png" width="70%"></img>

If you follow my image size recommendations, face recognition takes up to 3 seconds at rpi 3 B +. After the processing  completion
server will return a json structure to be displayed by the browser.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/json-return.png" width="40%"></img>

To continue the tests, click the back arrow in the browser..

## hassio-webrecognition: add-on restriction

The add-on has one limitation - photos of faces and the file with encoded face data are not saved after restarting the add-on or Home Assistant.
To get rid of this limitation, please support me on ByMeACoffee or PayPal, <a href=mailto:d4100kx@gmail.com>email me and I will share instructions</a> on how to install a face recognition server in HAOS that stores face data after rebooting. I and my family really need your support during the war in Ukraine.
If a large audience will interested to the project, I will continue to work on integrating the project into the Home assistant, for example, I will add the output to mqtt, or create a recognition sensor.

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
