#!/bin/bash

VN=$(git describe --abbrev=7 HEAD 2>/dev/null)

DYNAMICREPONAME=$(basename -s .git $(git config --get remote.origin.url))
PUBLISH_URL="https://jojjeboy.github.io/$DYNAMICREPONAME/"
POSTINSTALL_AUTO_COMMIT_MESSAGE="Postinstall autocommit message"

echo "Dynamic reponame: "$DYNAMICREPONAME
echo "Publish url: "$PUBLISH_URL

echo "********** Running script **************"

# När detta skriptet blir globalt och inte ligger i repot kan denna koden moddas och sen användas
# REPONAME=reachIt
# if [ "${REPONAME}" = "${DYNAMICREPONAME}" ]; then
#     echo "Yeeeey correct repo!!"
# else
#     echo "Du står i fel repo, gå till mappen där $REPONAME finns.\n*** Script stoppat ***"
#     exit 0;
# fi



if [ $# -eq 0 ]; then
  echo "Du måste skicka med commit meddelande.\n*** Script stoppat ***"
  exit 1
fi


if [[ $(git diff --stat) != '' ]]; then

  upLevel="minor"
  if [ $# -eq 2 ]; then
    if [ "$2" = "patch" ]; then
      upLevel="patch"
    elif [ "$2" = "major" ]; then
      upLevel="major"
    fi
  fi

  echo "npm version $upLevel";
  $(npm version $upLevel);
else
  VN="$VN-mod"
  echo "Inga förändringar upptäcktes.\n*** Script stoppat ***"
  exit 0
fi


PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION




# if [[ $(git diff --stat) != '' ]]; then

#   upLevel="minor"
#   if [ $# -eq 2 ]; then
#     if [ "$2" = "patch" ]; then
#       upLevel="patch"
#     elif [ "$2" = "major" ]; then
#       upLevel="major"
#     fi
#   fi

#   npm run "$upLevel" &&
#     git add . &&
#     git commit -m"$1" &&
#     npm run postinstall &&
#     ng build --prod --output-path docs --base-href "$PUBLISH_URL" &&
#     git add . &&
#     git commit -m"$POSTINSTALL_AUTO_COMMIT_MESSAGE" &&
#     git push
# else
#   VN="$VN-mod"
#   echo "Inga förändringar upptäcktes.\n*** Script stoppat ***"
#   exit 0
# fi
