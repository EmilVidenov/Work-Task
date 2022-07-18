const {MongoClient} = require('mongodb')

async function main() {
    const uri = 'mongodb+srv://EmilVidenov:frankensense982@cluster0.url7i.mongodb.net/?retryWrites=true&w=majority';

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await createMultipleListings(client, [
            {
                name: "Infinite Views",
                summary: "Modern home with infinite views from the infinity pool",
                property_type: "House",
                bedrooms: 5,
                bathrooms: 4.5,
                beds: 5
            },
            {
                name: "Private room in London",
                property_type: "Apartment",
                bedrooms: 1,
                bathrooms: 1
            },
            {
                name: "Beautiful Beach House",
                summary: "Enjoy relaxed beach living in this house with a private beach",
                bedrooms: 4,
                bathrooms: 2.5,
                beds: 7,
                last_review: new Date()
            }
        ]);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createMultipleListings(client, newListings) {
    const results = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${results.insertedCount} new listings created with the following id(s):`);
    console.log(results.insertedIds);
}

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}