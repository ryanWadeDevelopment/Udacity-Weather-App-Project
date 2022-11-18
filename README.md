# Weather-Journal App Project

## Overview

This app uses the OpenWeatherMap API to create journal entries for a Weather Journal App. The user should input their zipcode, along with how they are feeling to generate a journal entry. The app retrieves the weather data from OpenWeatherMap, puts a timestamp on the entry, and displays the user's feelings.

## Technology

This is an app built with Node using the Express framework. The app makes use of the Fetch API to make get and post requests. The app brings in weather data on the client side, then sends it to the app server where it is stored. The app then retrieves the stored data from the app server to update the client UI.
