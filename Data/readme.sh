echo "Generating README"
touch README.md
# get title put in
cat Data/Goal.txt > README.md
"## Tasks:" >> README.md
cat Data/TODO.txt >> README.md
# get images and put in
cat Data/Tools.txt >> README.md
"Notes:" >> README.md
cat Data/Notes.txt >> README.md
