#!/bin/sh
~/Development/ffmpeg-3.2.4/bin/ffmpeg -i ./Dog2.m4a -ac 2 -codec:a libmp3lame -b:a 48k -ar 16000 ../dog_alexa.mp3
