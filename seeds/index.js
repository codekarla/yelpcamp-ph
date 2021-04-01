// import modules
const mongoose = require('mongoose');
// import model
const Campground = require('../models/campground.js');
// import seed helpers
const {descriptors, places} = require('./seeders.js');
const cities = require('./cities.js');

// console.log(cities);

// connect mongoose to database
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Mongoose Connection Error:', err));

// function to return a random element in an array
const seeder = arr => arr[Math.floor(Math.random() * arr.length)];

// seeding
const seedDB = async () => {
    // delete existing data
    await Campground.deleteMany({});
    console.log('Deleted old data in campgrounds database');
    // seeding random camps
    for (let i = 0; i < 15; i++)
    {
        let rand = Math.floor(Math.random() * 164);
        // random price between 300 to 5000 pesos
        let price = 300 + Math.floor(Math.random() * 4701);
        let camp = new Campground({
            name: `${seeder(descriptors)} ${seeder(places)}`,
            author: '6063d6119f35671b2ff801cf',
            price: price,
            description: "With more than 7,000 islands consisting of rice paddies, volcanos, mega-metropolises, world-class surf spots, and endemic wildlife, the Philippines is one of the most dazzling and diverse countries in all of Asia.",
            location: `${cities[rand].city}, ${cities[rand].admin_name}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/kleandrav/image/upload/v1617239898/YelpCampPh/tfb4ple84bw1txv2spy2.jpg',
                    filename: 'YelpCampPh/tfb4ple84bw1txv2spy2'
                },              
                {
                    url: 'https://res.cloudinary.com/kleandrav/image/upload/v1617240001/YelpCampPh/zr25aigrbucdpvp9oghd.jpg',
                    filename: 'YelpCampPh/zr25aigrbucdpvp9oghd'
                },
                {
                    url: 'https://res.cloudinary.com/kleandrav/image/upload/v1617240003/YelpCampPh/n2qzukkt3wh7u6iqlqn5.jpg',
                    filename: 'YelpCampPh/n2qzukkt3wh7u6iqlqn5'
                },
                {
                    url: 'https://res.cloudinary.com/kleandrav/image/upload/v1617241775/YelpCampPh/k0jdcbb2fv1lfvgwfyhw.jpg',
                    filename: 'YelpCampPh/k0jdcbb2fv1lfvgwfyhw'
                },
                {
                    url: 'https://res.cloudinary.com/kleandrav/image/upload/v1617241778/YelpCampPh/fsitd6r1nsskq6qatrdy.jpg',
                    filename: 'YelpCampPh/fsitd6r1nsskq6qatrdy'
                }
            ]
        });
        await camp.save();
        console.log('Camp Saved:', camp);
    }
}

seedDB().then( () => mongoose.connection.close() );


// author: '6063d6119f35671b2ff801cf'
// hedwig ~ hedwig@hogwarts.com ~ potter
