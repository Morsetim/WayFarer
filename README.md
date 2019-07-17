# WayFarer
WayFarer is a public bus transportation booking server. 


### Travis CI
[![Build Status](https://travis-ci.com/Morsetim/QuickCredit.svg?branch=develop)](https://travis-ci.com/Morsetim/QuickCredit)


[![Coverage Status](https://coveralls.io/repos/github/Morsetim/QuickCredit/badge.svg)](https://coveralls.io/github/Morsetim/QuickCredit)
## Description
WayFarer is a public bus transportation booking server.

# Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Installation](#installation)

## Technologies
* Vanilla Javascript
* PostgreSQL Database(raw SQl)
* Nodejs (Express framework)

### Pivotal Tracker
WayFarer app project is broken down into small task with pivotal tracker board. The link to the relevant Pivoltal tracker board is https://www.pivotaltracker.com/n/projects/2362969

### API Enpoint



### API Documentation
API documentation 


## Features
- User can sign up
- User can sign in
- Users can book a seat on a trip.
- User can see all of his/her
- User can see all trips
- Users can delete their booking.
responsibilities.
- Admin can create a trip.
- Admin can cancel a trip
- Admin can see all trips
- Admin can see all bookings


## Getting Started
### Installation
- install POSTMAN app
- run `npm run start:dev` then navigate to `localhost:5000` on POSTMAN


### API Endpoint Route 
<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>TASK</th></tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td> <td> SignUp </td></tr>

<tr><td>POST</td> <td>api/v1/auth/signin</td> <td> Sign-In </td></tr>

<tr><td>POST</td> <td>/api/v1/trips</td> <td>All Trips </td></tr>

<tr><td>POST</td> <td>/api/v1/bus</td> <td>Create a bus</td></tr>

<tr><td>POST</td> <td>/trips/:busId</td> <td>Create a Trip</td></tr>

<tr><td>PATCH</td> <td>/trips/:tripId</td> <td>Cancel Trip</td></tr>

<tr><td>GET</td> <td>/api/v1/trips/bookings</td> <td>All Bookings</td></tr>

<tr><td>GET</td> <td>/api/v1/bookings/user</td> <td>User Bookings</td></tr>

<tr><td>POST</td> <td>/bookings/:tripId</td> <td>Book a seat</td></tr>




</table>

## Author
**Maurice Etim**  