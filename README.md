# [REACT]Moodaily

***Demo  : (alpha version, project has been updated since)***

[![Demo alpha](https://j.gifs.com/YvnD0O.gif)]

This project is designed with the React Native course in university UPMC (2018)

The goal was to create an app with react. 

We chose to create a tracker of mood.
You can search or just scroll the list to get the emot which matches your mood.
Each emot that has been chosen is saved in a local *MongoDB* database. (No need to be online :raised_hands: )

Then you can preview a chart containing all your scores. (how much emot of that mood you have been..)

An icon has been made:

![icon](https://github.com/TimPrd/-REACT-Moodaily/blob/master/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png)

# Installing

In order to install the app : 
```
git clone 

npm install 

(optional) react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

(optional) react-native link 

react-native run 
```
# Built mainly with :

- React Native
- React Native SVG Chart 
- Local MongoDB 

# In progress : 

- Adding a 'twitter' button so you can tweet your mood 
- Follow (follow the mood of others)
- Advices with your mood (movies, music, activities ..)

