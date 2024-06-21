echo "Generating README"
touch README.md
# get title put in
echo -e "# Recipe Server\n" > README.md
cat Data/Goal.txt >> README.md
echo -e "\n" >> README.md
cat Data/Tools.txt >> README.md
echo -e "\n\n## Tasks:" >> README.md
cat Data/TODO.txt >> README.md
# get images and put in
echo -e "\n\n## Notes:\n" >> README.md
cat Data/Notes.txt >> README.md
