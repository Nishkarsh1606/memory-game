const array1=[1,2,3,4]
const array2=[1,2,3,5]

for(i=0;i<array1.length;++i){
    if(array2[i]===array1[i]){
        console.log(`hello ${i}`);
    }
    else{
        console.log(`wrong`);
    }
}

//hello world