# Miruku.cafe Desktop Client

This is a minimal Electron wrapper around [Miruku.cafe](https://miruku.cafe) with Discord Rich Presence integration.

## Features

* Native desktop window for Miruku.cafe
* Discord status automatically updates based on what you are viewing (timeline, post, profile, etc.)
* Installer (.exe) generated via Electron-builder
* Uses Miruku.cafe brand assets

## Development

```bash
yarn install
yarn start
```

## Packaging (Windows)

```bash
yarn run dist
```

The installer and portable `.exe` will be placed in the `dist/` directory.

## Assets

Copy `icon.png` from the [`misskey-assets` repository](https://github.com/mirukucafe/misskey-assets) into `assets/icon.png` before packaging so that the application and installer have the correct icon.

## Discord Rich Presence

This project uses application ID **1392848530028105831** with image keys `logo` (large) and `online` (small). 