# DOESNT WORK WITH PM PROGRAM BECAUSE PATH IS WRONG
echo $1
read -p "Press enter to continue"
cd ../
if [[ "$!(git rev-parse --is-inside-work-tree 2>/dev/null)" ]]; then
    echo "Creating Repo:"
    # read -p "Pause"
    # git init
    # url=$(curl -L -X POST -H "Accept: application/vnd.github+json" -H "Authorization: Bearer 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" -H "X-GitHub-Api-Version: 2022-11-28" https://api.github.com/user/repos -d '{"name":"Recipe Server","description":"A device that can store and display recipies.","homepage":"https://github.com","private":false}' | sed -n 's/.*ssh_url//p' | cut -d'"' -f3)
    # git remote add origin $url
fi

# Commit and push changes
./readme.sh
git status
git add .
git status
echo "Commit message: "
read message
git commit -m"$message"
git push

read -p "Press enter to continue"
