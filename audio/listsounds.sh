#!/bin/sh
FILES=./*_alexa.mp3
for fin in $FILES
do
  ftmp=$(basename "$fin")
  fout=${ftmp%_alexa.mp3}
  echo "$fout"
done
