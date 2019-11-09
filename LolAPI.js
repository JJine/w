const req = require('request');

class LolAPI{
    constructor() {
        //속성
        this.key = "RGAPI-ba5d22ae-e6dc-4af8-a98f-f822ef0506cd";
    }
    //기능
    loadSummoner(name) {
        return new Promise((resolve, reject)=> {
            let url = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
            name=encodeURI(name);
            const key  = this.key;

            //name = encodeURI(name);
            // let key = "RGAPI-6bf24d45-9881-4e32-b3dd-b3f802637c8d";
            req.get(`${url}${name}?api_key=${key}`, (err, res, body)=> {
                let json = JSON.parse(body);
                let accId = json.accountId;
                let matchUrl = `https://kr.api.riotgames.com//lol/match/v4/matchlists/by-account/${accId}?api_key=${key}`;
                
                req.get(matchUrl, (err, res, body)=> {
                    let matchJson = JSON.parse(body).matches;
                    resolve({summoner:json, match:matchJson});
                 });
             });
        });
        
    }
}
module.exports = LolAPI;
