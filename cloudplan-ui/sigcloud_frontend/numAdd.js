var  b = 0;
// var a = process.argv[3]; 

for(i=2;i<5;i++){
	b = process.argv[i] + b;
}

console.log(b);