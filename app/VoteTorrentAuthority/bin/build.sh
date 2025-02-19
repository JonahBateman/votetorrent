#!/bin/bash

#TODO: Add support for iOS and add to git so it is automatically executable

# Step 1: Parse platform argument
PLATFORM=${1:-"android"}  # Default to android if no argument provided

# Function to print usage
print_usage() {
    echo "Usage: $0 [platform]"
    echo "Platforms:"
    echo "  android (default)"
    echo "  ios     (not supported yet)"
    echo "  all     (not supported yet)"
}

# Check platform argument
case "$PLATFORM" in
    "android")
        echo "Building for Android..."
        ;;
    "ios"|"all")
        echo "Building for $PLATFORM is not supported yet"
        exit 0
        ;;
    "-h"|"--help")
        print_usage
        exit 0
        ;;
    *)
        echo "Error: Unknown platform '$PLATFORM'"
        print_usage
        exit 1
        ;;
esac

# Step 2: Check the operating system
OS="$(uname -s)"
case "$OS" in
    Linux*)     
        BASE64_ENCODE="base64 -w 0"
        BASE64_DECODE="base64 -d"
        ;;
    Darwin*)    
        BASE64_ENCODE="base64"
        BASE64_DECODE="base64 -d"
        ;;
    CYGWIN*|MINGW32*|MSYS*|MINGW*) 
        BASE64_ENCODE="base64 -w 0"
        BASE64_DECODE="base64 -d"
        ;;
    *)          
        echo "Unsupported OS: $OS"
        exit 1
        ;;
esac

# Step 3: Check if credentials.json exists
if [ ! -f "credentials.json" ]; then
    echo "credentials.json file not found!"
    exit 1
fi

# Step 4: Base64 encode the credentials.json file
export CREDENTIALS_JSON_BASE64=$(cat credentials.json | $BASE64_ENCODE)

# Step 5: Restore credentials.json from the base64 value
echo "$CREDENTIALS_JSON_BASE64" | $BASE64_DECODE > credentials.json.tmp
mv credentials.json.tmp credentials.json

# Step 6: Run the eas build command
eas build --platform $PLATFORM --local

# Step 7: Clean up
unset CREDENTIALS_JSON_BASE64
