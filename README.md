# SENG2021

Using django(python3), Bootstrap, React, GraphQL,sqlite3

## Getting involve

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

## URLs

URL | Detail
:--- | :---
127.0.0.1:8000/ | ReactJS index
127.0.0.1:8000/admin | Django admin
