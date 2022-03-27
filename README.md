# hassio-webrecognition: add-on repository
Hassio addon for local face recognition web server. На даний час є докер образи для платформ armv7 amd64. Перевірено працює на raspberry 3B+, raspberry 4B (Home Assistant Operating System.), intel i3 linux Mint (Home Assistant Supervised and Home Assistant Operating System VM). У мене особисто сервер працював в HAOS RPI 4B і використовувався для розпізнавання облич камерою дзвінка на хвіртці, сповіщення через алексу хто саме подзвонив в дзвінок і автоматичного відкриття хвіртки в разі знайомого обличчя. Взаємодія сервера розпізнавання з home assistant реалізована в Node-Red. Flow наведено в кінці статті.

## Video illustration

Коротке відео з субтитрами про дзвінок з розпізнаванням облич на НА. !ЗРОБИТИ АНГЛІЙСЬКІ СУБТИТРИ І ПОСИЛАННЯ НА ПРОЕКТ І ДОНАТ

Watch on youtube:

[![Watch on youtube](https://img.youtube.com/vi/LVS-DfC3EMw/0.jpg)](https://youtu.be/LVS-DfC3EMw)

## Installing
In Hass.io, navigate to Supervisor > Add-on Store > Repositories and add 
`HASSIO Add-on: Web Recognition` repositorie

    https://github.com/AndreiRadchenko/hassio-webrecognition
    
Install and start addon.    
  
## Video instruction

Коротке відео з субтитрами про задання облич для розпізнавання і тест роботи сервера. !ЗАПИСАТИ ВІДЕО

Watch on youtube:

[![Watch on youtube](https://img.youtube.com/vi/-kzQXVCUmVY/0.jpg)](https://youtu.be/-kzQXVCUmVY)

## Local web server for realtime face recognition by http request or web interface. 

Після встановлення аддону в веббраузері перейдіть за адресою [Home Assistant IP]:5001
Відкриється сторінка "Samples page" на якій ви можете завантажити фото знайомих облич. Для більш швидкого розпізнавання
я рекомендую використовувати зображення SD resolution (1280x720 pix) adn up to 60 kB size. Звичайно таке зображення дає SD потік камери.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/sample_page.jpg" width="70%"></img> 

Сервер дозволяє задати до 5 "знайомих" облич з іменами (ім'я одним словом, без пробілів). 



