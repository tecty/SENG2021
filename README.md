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
