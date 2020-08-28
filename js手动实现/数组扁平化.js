/*
    数组扁平化——将多层嵌套的数组转化成一层
*/

function flatten(arr){
    let res=[];
    arr.forEach(item => {
        if(Array.isArray(item)){
            res=res.concat(flatten(item));//递归
        }else{
            res.push(item);
        }
    });
    return res;
}

let arr=[1,[2,3,[4,5]],6];
console.log(flatten(arr));