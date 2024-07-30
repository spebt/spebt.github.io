---
layout: default
title: How to setup python environment on ccr cluster
# permalink: /get-started/howto-ccr-setup-python/
date: 2024/07/29
---
## Setup the *Python* environment
*Note: This part should only be done once. You don't need to do this every time*\
Our package relies on `Python-3.9.6+`
### 1. Start with a clean python installation with the intel-toolchain
A clean installation is needed to avoid any conflicts.
#### 1.1 Load modules first ###
type the followign and press return
```bash
ml intel gcccore/11.2.0 python/3.9.6-bare hdf5/1.14.1
```

#### 1.2 Uninstall the user-installed packages
To uninstall, enter the following command
```bash
pip freeze --user | xargs pip uninstall -y
```
You should only see <u>pip</u> and <u>setuptools</u> if you do `pip list`

### 2. Install *pipenv*

[pipenv](https://pipenv.pypa.io/en/latest/installation.html) is a tool to manage python virtual environment and packages.\
To install, simply do:
```bash
pip install --user pipenv
```
### 3. Install the Python packages and setup virtual environment
We will use `pipenv`, but you can also use `pip` and `venv`.
#### 3.1 Setup the environment variables
1. Change directory to the module's folder. In this example, it will be `pymatcal`.
```sh
cd pymatcal
```
1. then simply:
```sh
source ubccr_env.sh
```

#### 3.2 Install the dependencies and activate the virtual environment
Simply
```sh
pipenv install && pipenv shell
```

