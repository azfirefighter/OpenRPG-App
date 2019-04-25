#TODO: Cleanup app/ build tree
#this includes libWrappers/build.sh
if hash npm 2>/dev/null; then
    npm install

    pushd libWrappers
    ./build.sh
    popd
else
    echo "NPM NOT INSTALLED, ABORTING..."
    exit 1
fi

./node_modules/.bin/electron-rebuild

LD_LIBRARY_PATH=../build/lib ./node_modules/.bin/electron .