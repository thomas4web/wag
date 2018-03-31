#!/bin/bash

npm run build
cordova prepare ios
(sleep 5;./open-webinspector.applescript) &
sleep 3;
./start-application-using-xcode.applescript
