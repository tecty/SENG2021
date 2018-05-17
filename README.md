# SENG2021

Using django, Reactjs

## Getting involve

### Set Your Working Branch

```shell
# create to your branch and working there
$ git checkout -b YOUR_BRANCH_NAME

# when you finshish, push the commits
$ git add && git commmit && git push
# IF you are push this branch FIRST TIME, you may use this line
$ git push --set-upstream origin master
```

### Setting Environment

```shell
# Create Virtual environment if you haven't
$ virtualenv venv -p `which python3` --no-site-packages
```

```shell
# activate the virtual envirnoment
$ source venv/bin/activate
```

### Install dependencies and setup the database

```shell
(venv) $ pip install -r requirements.txt

# setup the database
(venv) $ ./manage.py migrate
```

### Run the Server

A shell to run django's httpd.

```shell
# Run in local
(venv) $ ./manage.py runserver

# ALTERNATIVE: start the server to public
(venv) $ sudo python manage.py runserver 0:80
```

### Install frontend dependencies and run the Web

```shell
# in another shell
$ cd frontend
./frontend $ npm install
./frontend $ HTTPS=true npm start
```

## URLs

### Frontend

URL | Detail
:--- | :---
https://localhost:3000/ | Home
https://localhost:3000/map | Map
https://localhost:3000/about_us | About us

### Backend

URL | Detail
:--- | :---
http://127.0.0.1:8000/admin | Django admin
http://127.0.0.1:8000/docs | API docs
http://127.0.0.1:8000/api/v1/ | APIs
