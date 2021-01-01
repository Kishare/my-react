# OpenDataParis

## Context

This site uses OpendataParis API in Paris.

## How to use it?
```
git clone https://github.com/Kishare/my-react.git
npm i
npm start
enjoy !
```

## Structure
```
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── components
│   │   ├── event-form
│   │   │   └── index.js
│   │   └── navbar
│   │      └── index.js
│   ├── index.html
│   ├── index.js
│   └── index.scss
└── webpack.config.js
```

## Technologies

HTML/CSS
Javascript
ReactJS Framework

## Components

* event-form
  - contains the form and shows the specific events linked to the query the user has typed in the searchbar
* events
  - contains initial events
* navbar
  - contains the navbar

## Features

* Events
  - Events are shown in function of what the user types in the search bar. There are also initial results before the user types anything.