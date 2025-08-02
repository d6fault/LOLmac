---
title: osascript
tags: [execution, file-read, file-write]
description: macOS command line tool for executing AppleScript and JavaScript for Automation (JXA).
exec: |
  # Execute AppleScript command
  osascript -e 'do shell script "whoami"'
  
  # Execute JavaScript for Automation
  osascript -l JavaScript -e 'ObjC.import("stdlib"); $.system("whoami")'
  
  # Execute script from file
  osascript /path/to/malicious.scpt
file-read: |
  # Read file using AppleScript
  osascript -e 'do shell script "cat /etc/passwd"'
  
  # Read file using JXA
  osascript -l JavaScript -e 'ObjC.import("Foundation"); $.NSString.stringWithContentsOfFile("/etc/passwd")'
file-write: |
  # Write file using AppleScript
  osascript -e 'do shell script "echo malicious > /tmp/test"'
  
  # Write file using JXA
  osascript -l JavaScript -e 'ObjC.import("Foundation"); $.NSString.alloc.initWithUTF8String("malicious").writeToFileAtomically("/tmp/test", true)'
layout: binary
---
