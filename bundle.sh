#!/bin/bash

setup_environment()
{
    rm -rf provider provider.tar.gz $dir/public

    # Create directory structure
    mkdir -p provider/navigator/img
    mkdir -p provider/navigator/meshmap
    mkdir -p provider/userpref
}

# Parse the arguments
check_argument()
{
    for i in "$@"
    do
        VALUE=$(echo $i | awk -F= '{print $2}')
        case "$i" in
            -d=*| --dir=*) dir=$VALUE
            ;;
            --userpref=*) userprefdirs=$VALUE
            ;;
            --navigator=*) navigatordirs=$VALUE
            ;;
        esac
    done
}

run_build_script_navigator()
{
    IFS=' ' read -ra LOC <<< "$@"
    for i in "${LOC[@]}"; do
        cd $i; \
        npm ci; \
        npm run build; \
        cp dist/main.js ../provider/navigator/$i/index.js
        cd ..
    done
}

run_build_script_userpref()
{
    IFS=' ' read -ra LOC <<< "$@"
    for i in "${LOC[@]}"; do
        cd $i; \
        npm ci; \
        npm run build; \
        cp dist/ ../provider/userpref.js/$i/
        cd ..
    done
}

create_bundle()
{
    # Copy all of the static assets now
    cp capabilities.json ./provider
    cp -r ./assets/navigator/** ./provider/navigator/img

    # Archive the directory
    tar -zcvf provider.tar.gz ./provider
}

place_bundle()
{
    mkdir -p $dir/public
    mv provider.tar.gz $dir/public
}

dir="server"
userprefdirs=""
navigatordirs=""

check_argument "$@"

setup_environment

run_build_script_navigator "$navigatordirs"
run_build_script_userpref "$userprefdirs"

create_bundle
place_bundle