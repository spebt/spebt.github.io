# How to setup the *Python* environment

```{article-info}
:author: Fang Han
:date: Sept 19, 2024
:read-time: {sub-ref}`wordcount-minutes` mins read
:class-container: sd-p-1 sd-outline-muted sd-rounded-1
```

:::{Attention} 
This environment setup should only be done once. You don't need to do this every time
:::

## 1. Start with a clean python installation with the intel-toolchain

:::{note}
A clean installation is needed to avoid any conflicts.
:::

### 1.1 Load modules first ###

type the followign and press return
```bash
ml intel gcccore/11.2.0 python/3.9.6-bare hdf5/1.14.1
```

### 1.2 Uninstall the user-installed packages

To uninstall, enter the following command
```bash
pip freeze --user | xargs pip uninstall -y
```
You should only see <u>pip</u> and <u>setuptools</u> if you do `pip list`

## 2. Install *mpi4py* and *h5py parallel version*

:::{note}
Our package relies on `Python-3.9.6+`
:::

## 3. Install the Python packages

use `pip` to install the corresponding modules


