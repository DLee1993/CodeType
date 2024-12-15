# CodeType Guide

### <a href="https://github.com/DLee1993/CodeType" target="_blank">CodeType</a> is a sleek and modern typing test website.

![https://github.com/DLee1993/CodeType](./public/Screenshot.png)

## Commands

### Tab

-   Pressing tab focuses on the typing game

### Enter

-   Pressing enter refreshes the current typing game text

## Features

### Numbers

-   The numbers <span style="color:dodgerBlue; fontWeight: 900"><b>15, 30, 60, 120</b></span> are the different lengths of text you can choose from, by default it is <span style="color:dodgerBlue; fontWeight: 900"><b>15</b></span>

### Test type

-   You have a choice of three tests <span style="color:dodgerBlue; fontWeight: 900"><b>words, quotes or code</b></span> the typing game text depends on which one is selected, by default it is <span style="color:dodgerBlue; fontWeight: 900"><b>words</b></span>

### Themes

-   You have a variety of themes to choose from, when a theme is selected it will become the default theme everytime you visit the website, by default it is <span style="color:dodgerBlue; fontWeight: 900"><b>light-theme</b></span>

## Calculations

-   <span style="color:dodgerBlue; fontWeight: 900"><b>WPM</b></span>: Total number of characters (including spaces) of words you typed correctly `{Math.round(((60 / duration) * correctChar) / 5)}`

-   <span style="color:dodgerBlue; fontWeight: 900"><b>Accuracy</b></span>: Shows the percentage of characters you typed correctly `{((correctChar / text.length) * 100).toFixed(2)}%`

-   <span style="color:dodgerBlue; fontWeight: 900"><b>Duration</b></span>: Total number seconds it takes a user to complete the challenge, this is calculated by react-typing-game-hook using the `start time` and `end time` states.


## Support
- If you enjoyed this game, feel free to give it a star 🌟