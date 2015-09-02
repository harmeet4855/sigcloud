#!/bin/bash

BRANCH=master

wget https://bitbucket.org/SigmoidDev/cloudplan-recipes/get/$BRANCH.tar.gz
tar -xf $BRANCH.tar.gz;
mv SigmoidDev-*/* .;
rmdir SigmoidDev-*;
rm $BRANCH.tar.gz

