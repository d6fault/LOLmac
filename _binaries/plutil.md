---
title: plutil
tags: [execution, file-read]
description: Property list utility used for reading and converting plist files.
exec: |
  plutil -convert xml1 ~/Library/Preferences/com.apple.safari.plist -o -
file-read: |
  plutil -p ~/Library/Preferences/com.apple.safari.plist
layout: binary
---
