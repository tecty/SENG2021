# SENG2021

Using django(python3), Bootstrap, React, GraphQL,sqlite3

## Getting involve

### Set Your Working Branch

```shell
# create to your branch and working there
git checkout -b YOUR_BRANCH_NAME

# when you finshish, push the commits
git add && git commmit && git push
# IF you are push this branch FIRST TIME, you may use this line
git push --set-upstream origin master
```

### Setting Environment

```shell
# Create Virtual environment
virtualenv venv -p `where python3` --no-site-packages

# Getting into virtual environement
source venv/bin/activative
# install all the dependencies
pip install -r requirements.txt

# setup the database
./manage.py migrate
```

### Run the Server

A shell to run django's httpd.

```shell
# Getting into virtual environement
source venv/bin/activative

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
