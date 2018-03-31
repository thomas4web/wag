#!/usr/bin/osascript

#do shell script "open platforms/ios/WagDag.xcodeproj/"
tell application "Xcode"
        activate
        tell application "System Events"
                perform (keystroke "r" using command down)
        end tell
end tell