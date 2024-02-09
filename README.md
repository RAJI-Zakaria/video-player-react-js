# `Redeemers` Team : Rich Interface Project
First of all, we would like to express our enthusiasm as we embark on a React journey, inspired by `M. Marc Poppleton's` insightful teachings. This project is dedicated to creating a dynamic React app featuring a video player with interactive chapters, keywords, a map, and a live comment section. 

Just as M. Marc Poppleton encouraged exploration and innovation, this endeavor seeks to encapsulate the essence of learning through hands-on experience and interactive elements.

# Authors 
- Abir 
- Ferhat
- Zakaria


# Notice
- Please note that we are not specialized in React-JS. We have created this project as a team to learn how to use it and apply our knowledge.
- We've used Next.js for another mini-project about Accessibility. The provided lectures from M. Marc consolidated our skills.

# Table of Contents
- [`Redeemers` Team : Rich Interface Project](#redeemers-team--rich-interface-project)
- [Authors](#authors)
- [Notice](#notice)
- [Table of Contents](#table-of-contents)
- [Component Breakdown](#component-breakdown)
  - [VideoPlayer](#videoplayer)
  - [VideoControls](#videocontrols)
  - [TimelineProgressBar](#timelineprogressbar)
  - [Tags (keywords)](#tags-keywords)
  - [TimelineMarkersList](#timelinemarkerslist)
  - [ChatRoom](#chatroom)
  - [MapParent](#mapparent)
- [Acknowledgments](#acknowledgments)
- [React + TypeScript + Vite](#react--typescript--vite)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)


# Component Breakdown
Please note that we have one main component `Player` which contains all essential elements for our project, each element is separated in distinct file 'component' : 
## VideoPlayer
  + This component renders the video player itself and is responsible for video playback.

## VideoControls
Provides control buttons for playing, pausing, replaying, muting, and adjusting volume.

## TimelineProgressBar
  + Displays the progress of the video playback with a timeline progress bar and markers.

## Tags (keywords)
  + Displays keywords associated with the current video timestamp.

## TimelineMarkersList
  + Shows a list of timeline markers for quick navigation.

## ChatRoom
  + Integrates a chat room for user interaction during video playback.
  + Note : if you want to add `Time` inside the message body, then please respect the following format : `"hh:mm" or "hh:mm:ss"`
  + For example : watch the video at  `1:30` blablabla.

## MapParent
  + Displays a map with geographical waypoints associated with the video.


# Acknowledgments
- React Bootstrap
- Bootstrap
- OpenStreetMap
- Leaflet



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


