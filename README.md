# SENG2021
Using django(python3), Bootstrap, React, GraphQL,sqlite3

## Getting involve
### Setting Environment
```python
# Create Virtual environment
virtualenv venv --no-site-package -p `where python3`
pip install -r requirements.txt
# setup the database
python manage.py migrate
```
### Run the Server
```python
# Run in local
python manage.py runserver

# ALTERNATIVE: start the server to public
sudo python manage.py runserver 0:80
```
