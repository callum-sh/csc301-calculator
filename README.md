# Checkout Calculator

### Hosted on:
https://callum-josh-csc301-calc.herokuapp.com/

Make sure to be using Python version 3.10.7 and node version 18.4.0 when running locally (only tested for those versions)

### To run, do the following (max/linux):
1. pip install -r requirements.txt
For testing do the following 
4. python3 manage.py test
To build the backend (only if its been updated)
5. npm config set legacy-peer-deps true
6. npm --prefix ./frontend/ ci
7. npm run --prefix ./frontend/ build --if-present
To run locally
8. python3 manage.py runserver
To deploy onto heroku (assuming logged in)
9. git push heroku main

### Citations/Tutorials/Resources Used:

HEROKU HOSTING: 
https://devcenter.heroku.com/articles/getting-started-with-python

DJANGO/REACT INTEGRATION:
https://dev.to/nagatodev/how-to-connect-django-to-reactjs-1a71

and lots of stack overflow 