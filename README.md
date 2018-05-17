# SENG2021

Using django(python3), Bootstrap, React, GraphQL,sqlite3

## Getting involve

### Set Your Working Branch

```shell
# create to your branch and working there
$ git checkout -b YOUR_BRANCH_NAME

# when you finshish, push the commits
$ git add && git commmit && git push
# IF you are push this branch FIRST TIME, you may use this line
git push --set-upstream origin YOUR_BRANCH_NAME
```

### Setting Environment

```shell
# Here only need to configure once
# Create Virtual environment if you haven't
$ virtualenv venv -p `which python3` --no-site-packages
# setup the domain name in localhost by modify host file
# (Ubuntu 1604 and 1804)
$ sudo nano /etc/hosts
# add this line at end of IPv4 part
127.0.1.1       siround.com
# save and exit
```

```shell
# activate the virtual envirnoment
$ source venv/bin/activate
```

### Install frontend dependencies and build production

```shell
$ cd frontend
./frontend $ npm install
./frontend $ npm run build
```

### Install dependencies and setup the database

```shell
(venv) $ pip install -r requirements.txt

# setup the database
(venv) $ ./manage.py migrate
```

### Update backend
```shell
(venv) $ pip install -r requirements.txt

# setup the database
# if there's error on migrate to update the database
# please delete the old database and migrate a new one.
(venv) $ ./manage.py migrate
# create a  backend super user
(venv) $ ./manage.py createsuperuser
# follow the instruction to create super user.
```

### Run the Server

A shell to run django's httpd.

```shell
# Run in local
(venv) $ ./manage.py runsslserver

# ALTERNATIVE: start the server to public
# (default post of HTTPS is on 443)
(venv) $ sudo python manage.py runsslserver 0:443
```

## URLs

URL | Detail
:--- | :---
127.0.0.1:8000/ | Legacy index
127.0.0.1:8000/api/ | JSON APIs
127.0.0.1:8000/api-auth/ | JSON Login
127.0.0.1:8000/maps/ | Map index
127.0.0.1:8000/admin/ | Django admin
