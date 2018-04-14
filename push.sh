git add .
echo "commit message: "
read message

git commit -m "$message"

git push -u origin master