# flappybirdML
This project uses Machine Learning in Flappy Bird. It is not finished; currently, the functionality is to merely collect data, as a lot of data is required. Feel free for any pull requests; however, keep in mind that this is a personal project for school. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software:

```
Python 3+
pip
virtualenv
```

### Installing

Initialize a git repository on a remote folder and pull from this link
```
> git init
> git remote add origin https://github.com/adityada/flappybirdML
```
Initialize a virtual environment in the folder
```
> virtualenv venv
```
Open your virtual environment. On Windows:
```
> venv\Scripts\activate
```
On Mac:
```
> . venv/bin/activate
```
Install the following prerequisites on your virtual environment using pip:
```
> pip install flask
> pip install flask-sqlalchemy
> pip install flask_marshmallow
> pip install marshmallow-sqlalchemy
> pip install flask_cors
```

Create your database by
```
> python
python3 > from datam import db
python3 > db.create_all()
```
## Authors

* **Aditya Dananjaya** 

## Acknowledgments

* Inspired by Daniel Shiffman from The Coding Train
