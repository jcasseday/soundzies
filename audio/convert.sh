#!/bin/sh
FILES=./needsconverting/*
for fin in $FILES
do
  ftmp=$(basename "$fin")
  fout=${ftmp%.*}_alexa.mp3
  echo "Processing $fin to $fout"
  ~/Development/ffmpeg-3.2.4/bin/ffmpeg -i $fin -ac 2 -codec:a libmp3lame -b:a 48k -ar 16000 $fout
  mv $fin converted/
done
