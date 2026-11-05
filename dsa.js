//dsa first question
function checkAnagram(str1, str2) {

    let a = str1.toLowerCase().split("").sort().join("");
    let b = str2.toLowerCase().split("").sort().join("");

    return a === b;
}

console.log(checkAnagram("listen", "silent")); 
console.log(checkAnagram("hello", "world"));  