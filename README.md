# SENG2021

Using django(python3), Bootstrap, React, GraphQL,sqlite3

## Getting involve

### Setting Environment

```shell
# Create Virtual environment
virtualenv venv -p `where python3` --no-site-packages
pip install -r requirements.txt
# setup the database
./manage.py migrate
```

### Run the Server

A shell to run django's httpd.

```shell
# Run in local
./manage.py runserver

# ALTERNATIVE: start the server to public
sudo python manage.py runserver 0:80
```

## URLs

URL | Detail
:--- | :---
127.0.0.1:8000/ | ReactJS index
127.0.0.1:8000/admin | Django admin

## TODO LIST
Tick it when you complete!

### Iteration 1
Scheduled date of completion: 24/04/2018

Goal: Complete the basic use for this web application. 
* Search a place in the search bar
* Display posts within the selected area in the posts list
* Add pin on map and make a new post

Things not include in this iteration:
* Login is not required when creating a new post

#### Backend
- [ ] Database design
- [ ] Database implementation

#### Frontend
- [x] Map component
- [ ] PlaceMarker component
- [ ] SearchBar component
- [ ] PostsList component
- [ ] PostDetail component
- [ ] NewPost component
- [ ] Art Design (css)
- [ ] Logo Design

#### APIs
- [ ] Fetch events/posts in database (may be in the next iteration)
- [ ] Search some useful APIs and reading their documentions (can start to implement)
