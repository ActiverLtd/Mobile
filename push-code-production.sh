#!/usr/bin/env bash
code-push release-cordova activer-ios ios -d Production -m
code-push release-cordova activer-android android -d Production -m
echo "\n\nPress any button to exit."
read -n 1 key
  
