# How to generate system response matrix from Gate simulation

```{article-info}
:author: Luo Jinghong, Fang Han
:date: Sept 19, 2024
:read-time: 30 min ~ 1 hour
:class-container: sd-p-1 sd-outline-muted sd-rounded-1
```

## How to open Gate v9.4

:::{note}
Following contents are based on using UB OnDemand
:::

You can apply for a node when click on "Quick Launch General-Computer Desktop", and then you will have a 24 hours node;
Then you can import these codes line by line:
```shell
module load gcc/11.2.0 geant4/11.2.1 geant4-data/11.2 
export GEANT4_DATA_DIR=${EBROOTGEANT4MINDATA} 
module load gcc/11.2.0 openmpi/4.1.1 gate/9.4 geant4-data/11.2
```
after that you should go to the top folder of your .mac file,and then use code as follow:
```shell
Gate --qt Yourfilename.mac
```
then it will start to run.

## How to change root file into PDF/npz/hdf5 

:::{tip}
You should use _Jupyter Lab/Notebook Advanced Options_.
:::

1. Cilck on "Jupyter Lab/Notebook Advanced Options" 

1. Put `gcc/11.2.0  openmpi/4.1.1 root/6.26.10 matplotlib/3.5.2` in _Extra Modules_ To Load with Jupyter

2. Set _QoS_ as `general-compute`

3. Take a look at my code decribed in `change_root_to_pdf`. I recommand all use `.npz`, because if you want to use `hdf5`, you should import h5py which will cause more trouble.

## How to reconstruct by digital picture

1. open pyrecon file;

1. put your `.npz` or `.hdf5` file into data file;
 
1. use `test_projection_nonmpi.py` to generate projection;

1. use `test_recon_nonmpi.py` to generate reconstruction picture;

1. In `pyrecon/data` file, there is not only hotrod_phantom, but also a file `2p-source-gen.ipynb` to generate digital picture(that code can change the position and size of a point)

1. you can use `read_projection_npz` and `read_recon_npz` to see the picture result

## How to reconstruct by MC simulation

You can simply change the shape and number of your source and then run the .mac file.
Then you can use "change_root_to_projection" in Jupyter notebook to get your projection file.

## Tricks of using Gate to build your machine

1. http://opengatecollaboration.org/ is the most useful one, and then you find the documentation to get start.

1. after v9.3 the digitizer code has a big change

1. only the repeater code applied in the crystal can you get different crystalID

1. rotate would happen in the axis of your object. For example, if you want to rotate the machine head, please rotate the world.

## Tricks of using root
After import:
```shell
module load gcc/11.2.0 geant4/11.2.1 geant4-data/11.2 
export GEANT4_DATA_DIR=${EBROOTGEANT4MINDATA} 
module load gcc/11.2.0 openmpi/4.1.1 gate/9.4 geant4-data/11.2
```
Your should do
```shell 
"root Yourfilename.root" to open your root file. 
```
For me, use root command
- `.ls` to see the file in my root file,
- command `Singles->Print()` to see the list of "Singles"
- command `Singles->Draw("Your target name")` to draw the histogram 
- `Singles->GetEntries()` to get the number of the events

:::{tip}  
More code about root is here https://root.cern/learn/ (it is really a big task!!!)
:::


    

