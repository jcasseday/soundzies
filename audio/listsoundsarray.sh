#!/bin/sh
FILES=./*_alexa.mp3
echo const audioData = {
for fin in $FILES
do
  ftmp=$(basename "$fin")
  fout=${ftmp%_alexa.mp3}
  echo "  '$fout'": "'<audio src="'"https://s3.amazonaws.com/soundzies/audio/'"$ftmp"'"'" />',"
done
echo "  'test': 'sound test'"
echo "};"
