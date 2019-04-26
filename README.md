
# OpenRPG
[![Build Status](https://travis-ci.org/incomingstick/OpenRPG.svg?branch=master)](https://travis-ci.org/incomingstick/OpenRPG)
![Version Number](https://img.shields.io/badge/version-v0.5.0--dev-blue.svg)
[![Discord Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/xEwaYE5)
[![Build status](https://ci.appveyor.com/api/projects/status/jhcr2ebcws32bs2m?svg=true)](https://ci.appveyor.com/project/incomingstick/openrpg)

OpenRPG is still in its infancy and I want it to do a lot by v1.0.0!  
What OpenRPG aims to accomplish two fold.  

First, it will be a tool for someone to use to quickly create content
for a tabletop RPG world. v1.0.0 will focus specifically on the
5e rules, however I hope to have that expand out to include
Pathfinder and as far back as AD&D.

Secondly, OpenRPG should be structured in such a way that game developers
that want to emulate the d20 system in a video game could easily implement
our libraries in their games to help speed production of back end tools.

Some of the features this tool will include by v1.0.0 are:
- A GUI front-end for the CLI tools
- A die simulation tool
- A name generator tool
- A character generator tool (with the option to autofill a character sheet)
- A town generator tool
- An encounter/combat generator tool
- A world generator tool
- A world/town map generator

... And more (hopefully)!

v0.1.0 is a basis for the CLI/developer version, but v1.0.0 will contain a
portable GUI that works on Windows, Linux, and macOS.

## Building
Currently we require `cmake` (at least v2.8.4) and `make`, and your choice of C/C++ compiler for the library binaries. To compile the gui see [Building the GUI](#building-the-gui) below.

Note: This project strives to keep its source as clean of any dependancies to be as cross platform as possible. If you have suggestions to help move toward that goal, please feel free to open issues, or even a PR!

### Linux Build Script
The build script now provides some extra assistance with building, installing, uninstalling and more.

**Debug build:** `$ ./build.sh`

**Install debug build:** `$ ./build.sh install`

**Release build:** `$ ./build.sh release`

**Install release build:** `$ ./build.sh release install`

**Linux clean build:** `$ ./build.sh clean`

**Linux clean and rebuild:** `$ ./build.sh rebuild`

Note: `build.sh` has the potential to work on MacOS, but is currently untested. If you happen to use a Mac, please test this!

### Windows Build Script
This script is VERY minimal compared to its bash counterpart. It could use a ton of improvements, so if that is something you are interested in, open a PR!

Simply run `> build.bat`


### Manual Build
Create a build directory `$ mkdir build && cd build`  
Run cmake `$ cmake ..` **OR** Optionally run `$ cmake -DCMAKE_INSTALL_PREFIX=/desired/install/location ..`  
Run make `$ make`  

## Check Integrity of Build
In the toplevel `build/` folder, run make check `$ make check` 

## Building the GUI
Currently we require `npm` in addition to the requirements noted above to build the GUI. To compile the main binaries see [Building](#building) above.

### Manual build
Because we need to link to our C++ libraries building and linking properly gets pretty complicated pretty quick. To make this easier just use the provided build.sh files. I will not go into manual build details here. If you would like to understand this better, I suggest opening up those scripts and taking a look.

### Linux Build Script
The build script now provides some extra assistance with building and running the GUIs.

**Debug build:** `$ ./build.sh app`

**Release build:** `$ ./build.sh release app`

**Linux clean build:** `$ ./build.sh clean app`

Note: this currently only cleans the top level build/ folder, and not the app.

**Linux run the app:** `$ ./build.sh run app`

Note: `build.sh` has the potential to work on MacOS, but is currently untested. If you happen to use a Mac, please test this!

### Windows Build Script
Currently the Windows built.bat does not support building the app.

# Installing
After building, in the `build/` folder, run make install `$ make install`

# Uninstalling
After installing, in the `build/` folder, run make uninstall `$ make uninstall`

**NOTE:** Currently this will NOT install the GUI.

# License
OpenRPG Software License - Version 1.0 - February 10th, 2017 <https://www.openrpg.io/about/license/>
