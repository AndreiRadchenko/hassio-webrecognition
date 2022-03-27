# hassio-webrecognition: add-on repository
Hassio addon for local face recognition web server. На даний час є докер образи для платформ armv7 amd64. Перевірено працює на raspberry 3B+, raspberry 4B (Home Assistant Operating System.), intel i3 linux (Home Assistant Supervised and Home Assistant Operating System VM)

## Installing
In Hass.io, navigate to Supervisor > Add-on Store > Repositories and add

    https://github.com/AndreiRadchenko/hassio-webrecognition
  
## Video instruction

Коротке відео з субтитрами про задання облич для розпізнавання і тест роботи сервера.

Watch on youtube:

[![Watch on youtube](https://img.youtube.com/vi/-kzQXVCUmVY/0.jpg)](https://youtu.be/-kzQXVCUmVY)

## Local web server for realtime face recognition by http request or web interface. 

Після встановлення аддону в веббраузері перейдіть за адресою [Home Assistant IP]:5001
Сервер дозволяє задати до 5 "знайомих" облич з іменами (ім'я одним словом, без пробілів)
