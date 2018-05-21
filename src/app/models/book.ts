export class Meetup {
    constructor(
        public author: string[], 
        public id: number, 
        public title: string, 
        public image: string, 
        public price: number,
        public category: string,
        public publicationDate: string,
        public description: string,
        public rating: number,
        public meetupData: {
                name: string,
                description: { type: String },
                image: { type: String },
                price: {type: Number, required: true  },
                eventsDate: { type: Date },
                address: { type: String },
                category: { type: String }, 
                rating:  {type: Number }
            },
        public createdBy:  { type: String, required: true }, 
        public participants: [{
                username: { type: Number, default: 0 }
            }],
        public comments: [{
                commentsRating: { type: Number, default: 0 },
                commentsTitle: { type: String },
                commentsDescription: { type: String }
            }]   
    )
         { 
    }
 } 
 //json-server --watch db.json