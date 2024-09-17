# How to use ccr cluster

date: 2024/07/30

##  Get UB CCR account

An UB CCR (Center for Computational Research) account gives you [UB CCR HPC cluster](https://www.buffalo.edu/ccr/support/research_facilities/ub-hpc.html) access.

- Check [this link](https://www.buffalo.edu/ccr/support/ccr-help/accounts.html) for more about the ccr account.

##  Login to HPC computing node

There are mainly 2 ways to do it.

### Via OnDemand 
- OnDemand is a webpage-based portal. Learn more from [this link](https://docs.ccr.buffalo.edu/en/latest/portals/ood/). 

- OnDemand portal URL address: [https://ondemand.ccr.buffalo.edu/](https://ondemand.ccr.buffalo.edu/)

*Note: UBVPN is needed for access the HPC cluster from outside the campus*

### Via SSH

SSH is usally the preferred way.
- Check [this UB CCR link](https://docs.ccr.buffalo.edu/en/latest/hpc/login/) for more information.

## Using the UB CCR HPC nodes

UB CCR HPC login nodes is hosted with Ubuntu 22.04.4, which is a linux distribution.

### Some useful linux command

- `cp` copy files and directories
- `cd` Change working directory 
- `ls` list directory contents

Learn more from [here](https://ubuntu.com/tutorials/command-line-for-beginners)\
and even more from [here](https://support.cs.wm.edu/index.php/tips-and-tricks/basic-linux-commands)

### Use Lmod to manage modules on the nodes

- `module list` or simply `ml` to list loaded modules
- `module load` to load a module or modules
  
  example:
  ```bash
  module load intel 
  ```
  The command above will load the intel-toolchain

Check the [Lmod documentation](https://lmod.readthedocs.io/en/latest/) for more information.

### Requesting for an interactive computing node with SLURM

You can type the following command to ask for 4 cores and 8 GB memories
```bash
salloc --qos=nih --partition=general-compute --job-name "interactive-compute" --nodes=4  --mem=2G  --time=12:00:00;srun --pty /bin/bash --login
```