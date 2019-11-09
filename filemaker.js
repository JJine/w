const fs = require('fs'); //노드 js의 파일 시스템

// fs.readFile("champ.json", "utf8", (err, data)=> {
//     console.log(data); //비동기
// });

let json = fs.readFileSync("champ.json", "utf8");
json = JSON.parse(json); //데이터를 json 형태로 읽기 위해서는 parse가 필요함
 
let champList = json.data;

let keyList = Object.keys(champList);

let myJson = [];

for(let i = 0; i<keyList.length;i++) {
    let item = champList[keyList[i]];
    let myItem = {name:item.name, id:item.id, img:item.image.full};
    myJson[item.key] = myItem;
}

fs.writeFileSync("myChamp.json",JSON.stringify(myJson), "utf8");
