export class Favorite {
    constructor(
        public meetupId: any, 
        public userId: any, 
        public count: number
    ) { }
 }

 //json-server --watch db.json