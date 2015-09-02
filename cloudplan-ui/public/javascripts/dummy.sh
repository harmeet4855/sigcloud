#!/bin/bash

count=1
while [[ $#>0 ]]
do
    echo $1
    cp $1 $1-$count
    count=$[$count+1]
    echo "hello"
    shift
done
