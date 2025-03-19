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

## Just in case the server is down, you can use the following code as a JSON file or create your own endpoint
```
{
    "Film": {
        "file_url": "https://archive.org/download/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4",
        "title": "Route 66, An American (Bad) Dream",
        "synopsis_url": "https://wiki.creativecommons.org/wiki/Route_66_-_An_American_(bad)_Dream"
    },
    "Chapters": [
        {
            "pos": "0",
            "title": "Start"
        },
        {
            "pos": "45",
            "title": "Intro"
        },
        {
            "pos": "117",
            "title": "New Mexico"
        },
        {
            "pos": "237",
            "title": "Credits"
        },
        {
            "pos": "300",
            "title": "Washington DC, 2 weeks earlier"
        },
        {
            "pos": "970",
            "title": "White House"
        },
        {
            "pos": "1250",
            "title": "Hitting the road"
        },
        {
            "pos": "1620",
            "title": "Leaving New York"
        },
        {
            "pos": "2100",
            "title": "Motels"
        },
        {
            "pos": "3250",
            "title": "Chicago"
        },
        {
            "pos": "3610",
            "title": "Route 66, finally"
        },
        {
            "pos": "3850",
            "title": "Leaving Amarillo"
        },
        {
            "pos": "4400",
            "title": "Stranded in the desert"
        },
        {
            "pos": "5090",
            "title": "Vegas"
        },
        {
            "pos": "5780",
            "title": "Searching Hollywood"
        },
        {
            "pos": "5880",
            "title": "San Diego"
        },
        {
            "pos": "5955",
            "title": "Credits"
        }
    ],
    "Waypoints": [
        {
            "lat": "32.42",
            "lng": "-90.13",
            "label": "Ridgeland",
            "timestamp": "45"
        },
        {
            "lat": "38.90",
            "lng": "-77.04",
            "label": "Washington DC",
            "timestamp": "300"
        },
        {
            "lat": "40.73",
            "lng": "-73.93",
            "label": "New York",
            "timestamp": "1940"
        },
        {
            "lat": "41.88",
            "lng": "-87.63",
            "label": "Chicago",
            "timestamp": "3250"
        },
        {
            "lat": "35.22",
            "lng": "-101.83",
            "label": "Amarillo",
            "timestamp": "3750"
        },
        {
            "lat": "36.17",
            "lng": "-115.14",
            "label": "Las Vegas",
            "timestamp": "5210"
        },
        {
            "lat": "34.09",
            "lng": "-118.33",
            "label": "Hollywood",
            "timestamp": "5780"
        },
        {
            "lat": "32.72",
            "lng": "-117.16",
            "label": "San Diego",
            "timestamp": "5780"
        }
    ],
    "Keywords": [
        {
            "pos": "0",
            "data": [
                {
                    "title": "Route 66",
                    "url": "https://en.wikipedia.org/wiki/U.S._Route_66"
                },
                {
                    "title": "Stefan Kluge",
                    "url": "http://www.imdb.com/name/nm1667631/"
                },
                {
                    "title": "Mathias Einmann",
                    "url": "http://www.imdb.com/name/nm1667578/"
                }
            ]
        },
        {
            "pos": "117",
            "data": [
                {
                    "title": "New Mexico",
                    "url": "https://en.wikipedia.org/wiki/New_Mexico"
                },
                {
                    "title": "Cadillac",
                    "url": "https://en.wikipedia.org/wiki/Cadillac_Series_62"
                }
            ]
        },
        {
            "pos": "300",
            "data": [
                {
                    "title": "Washington DC",
                    "url": "https://en.wikipedia.org/wiki/Washington,_D.C."
                }
            ]
        },
        {
            "pos": "970",
            "data": [
                {
                    "title": "White House",
                    "url": "https://en.wikipedia.org/wiki/White_House"
                }
            ]
        },
        {
            "pos": "1620",
            "data": [
                {
                    "title": "New York",
                    "url": "https://en.wikipedia.org/wiki/New_York_City"
                }
            ]
        },
        {
            "pos": "2100",
            "data": [
                {
                    "title": "Motels",
                    "url": "https://en.wikipedia.org/wiki/Motel"
                },
                {
                    "title": "Jump start",
                    "url": "https://en.wikipedia.org/wiki/Jump_start_(vehicle)"
                }
            ]
        },
        {
            "pos": "3250",
            "data": [
                {
                    "title": "Chicago",
                    "url": "https://en.wikipedia.org/wiki/Chicago"
                }
            ]
        },
        {
            "pos": "3850",
            "data": [
                {
                    "title": "Amarillo",
                    "url": "https://en.wikipedia.org/wiki/Amarillo,_Texas"
                },
                {
                    "title": "Cadillac Ranch",
                    "url": "https://en.wikipedia.org/wiki/Cadillac_Ranch"
                }
            ]
        },
        {
            "pos": "5090",
            "data": [
                {
                    "title": "Las Vegas",
                    "url": "https://en.wikipedia.org/wiki/Las_Vegas"
                },
                {
                    "title": "The Strip",
                    "url": "https://en.wikipedia.org/wiki/Las_Vegas_Strip"
                }
            ]
        },
        {
            "pos": "5780",
            "data": [
                {
                    "title": "Hollywood",
                    "url": "https://en.wikipedia.org/wiki/Hollywood"
                }
            ]
        },
        {
            "pos": "5880",
            "data": [
                {
                    "title": "San Diego",
                    "url": "https://en.wikipedia.org/wiki/San_Diego"
                }
            ]
        }
    ]
}
```
