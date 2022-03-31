# hassio-webrecognition: add-on repository
Hassio addon for local face recognition web server based on the https://github.com/ageitgey/face_recognition progect. Currently there are docker images for armv7, aarch64 and amd64 platforms. Tested on raspberry 3B +, raspberry 4B (Home Assistant Operating System.), Intel i3 linux Mint (Home Assistant Supervised and Home Assistant Operating System VM). In my setup, server worked on HAOS RPI 4B and was used for face recognition with a doorbell camera on the wicket. There was a Alexa notification, that anounse who the ring doorbell, and the automatic wicket lock opening in case of a known face. The recognition server interaction with the home assistant is implemented in Node-Red. Flow is given at the end of the article.

## Video illustration

Short video with subtitles about the doorbell with face recognition on Home Assistant.

[![Watch on youtube](https://img.youtube.com/vi/LVS-DfC3EMw/0.jpg)](https://youtu.be/LVS-DfC3EMw)

## Installing
In Hass.io, navigate to Supervisor > Add-on Store > Repositories and add 
`HASSIO Add-on: Web Recognition` repositorie

    https://github.com/AndreiRadchenko/hassio-webrecognition
    
The image file is about 1 GB, so it may take 10-15 minutes to download. Install and start addon.

If you have dedicated server with docker and with amd64 architecture, you can install webrecognition server by cli command:

```cli
docker run --restart always -d --name=web_recognition -p 5001:5001 andriiradchenko/web_recognition:amd64
```

## Local web server for realtime face recognition by http request or web interface. 

After add-on installation open the web browser and go to [Home Assistant IP]: 5001.
A "Samples page" will open, and there you can upload photos of known faces. To select a photo, press `Select`. Enter a name in the adjacent field, in one word without spaces. If you don't use all 5 photos, just delete name and leave field empty. For faster recognition I recommend using SD resolution images (1280x720 or 720x576 pix) and up to 60 kB size. Usually this image resolution gives the SD stream of the camera.
The server allows you to specify up to 5 "known" faces with names.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/chose_foto_name.jpg" width="100%"></img> 

After adding images of known faces and editing names, click the `Upload` button at the bottom of the page. This will run a script that
encodes faces as vector arrays and writes these arrays to a file. The encoding process on rpi3 B + can take up to 1 minute, depending on the number of faces and the size of the image files. The face encoding script also started by pressing `Enter`.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/upload.jpg" width="100%"></img> 

When the encoding script is finish, the Completed page will be displayed. Click the `Return to the main page` button.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/completed-page.png" width="100%"></img> 

For the face recognition test, click on the `Test Page` button at the top of the Samples page.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/sample_page.jpg" width="100%"></img> 

On the Test Page, click the `Select` button to select a test portrait.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/test-page.jpg" width="100%"></img> 

After selecting a photo, click the `Upload` button.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/test_page.png" width="100%"></img>

If you follow my image size recommendations, face recognition takes up to 10 seconds at rpi 3B+ and up to 3 seconds at rpi 4B. After the processing  completion
server will return a json structure to be displayed by the browser.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/json-return.png" width="60%"></img>

To continue the tests, click the back arrow in the browser..

## hassio-webrecognition: add-on restriction

The add-on has one limitation - photos of faces and the file with encoded face data are not saved after restarting the add-on or Home Assistant.
To get rid of this limitation, please support me on ByMeACoffee or PayPal, <a href=mailto:d4100kx@gmail.com>email me and I will share instructions</a> on how to install a face recognition server in HAOS that stores face data after rebooting. I'm and my family really need your support during the war in Ukraine.
If a large audience will interested to the project, I will continue to work on integrating the project into the Home assistant, for example, I will add the output to mqtt, or create a recognition sensor.

<a href="https://www.buymeacoffee.com/andriiradchenko" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>   <a href="https://www.paypal.com/donate/?hosted_button_id=QB42TMLKZ7KAE" target="_blank"><img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/paypal-donation.png" alt="Donate with PayPal" style="height: 60px !important;width: 250px !important;" ></a>

## Face recognition server interaction with Home Assistant.

Face recognition server interaction with Home Assistant is implemented in Node-Red. You can import my flow to Node-Red. 
In response to the event of pressing the doorbell button,  "Cam Dorbell" flow takes a picture from the doorbell camera and sends it via `html request node` to the webrecognition server.
After the server processing,  result of recognition in the form of JSON object arrives in `html request node`. And depending on its contents` Switch node`
open or does not open the wicket lock and set input_boolean sensors. I use these sensors in the Alexa routine to announce by voice assistant who exactly ring the doorbell.


Node-Red Flow            |  Description
-------------------------|-------------------------
[Cam_Doorbell.json](https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/flows.json) | Flow for interaction with Home Assistant  

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-flow.jpg" width="100%"></img> 

You need to install in Node-Red [node-red-contrib-image-tools](https://flows.nodered.org/node/node-red-contrib-image-tools) and
[node-red-contrib-image-output](https://flows.nodered.org/node/node-red-contrib-image-output) nodes.
To do this, open Node-Red -> Settings (Sandwich button) -> Manage palette. Go to the Install tab and enter "image-tools" in the search field.
Install this node, then install  "image-output" node.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/install-image-tool.jpg" width="49%"></img> <img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-contrib-image-output.jpg" width="49%"></img>

Edit the node "Doorbell button" according to the sensor that will activate the automation.
Edit the node "API" to configure which camera you want to capture. For faster image processing you need to take SD video stream.

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-API-cam-thumbnail.jpg" width="100%"></img>

If the webrecognition  server and Node-Red are running on the same machine,  the node "http request" can be left unchanged. Otherwise it is necessary
to edit the IP address of the webrecognition server in the URL field of the  "http request" node: [webrecognition_IP]:5001/test

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-send-http.jpg" width="100%"></img>

If the webrecognition server returns a JSON object with an empty field "faces_list", node "Switch" activates its first output, which simply outputs
JSON object to Debug stream. If the "faces_list" field is not empty, then someone with a known face is standing in front of the door and "Switch" passes control to second
output. A node that opens the wicket lock is connected to it. Node "Switch" also activates the output containing the name of the recognized person to which connected the nodes that 
activates  corresponding `input_boolean`

<img src="https://github.com/AndreiRadchenko/hassio-webrecognition/blob/main/img/node-red-switch.jpg" width="100%"></img>
