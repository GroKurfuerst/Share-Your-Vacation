const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cities = require("./cities")
const { descriptors, places } = require("./seedHelpers")
const Campground = require("../models/campground")

mongoose.connect("mongodb://localhost:27017/yelpcamp")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    const price = Math.floor(Math.random() * 10) + 10
    for (let c of cities) {
        const camp = new Campground({
            author: "6391392388a3c215d91b416c",
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: "http://source.unsplash.com/collection/483251",
            location: `${c.city}, ${c.state}`,
            geometry: {
                type: 'Point',
                coordinates: [c.longitude, c.latitude]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nua ex sequi nobis repellat, fugit quam sint, totam, natus molestiae a explicabo officia repudiandae maiores ab incidunt? Aspernatur tempore dignissimos eaqllue!",
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/drmnbjouo/image/upload/v1659201451/YelpCamp/gtgaguhwlfxnzng7es4d.jpg',
                    filename: 'YelpCamp/gtgaguhwlfxnzng7es4d'
                },
                {
                    url: 'https://res.cloudinary.com/drmnbjouo/image/upload/v1659201451/YelpCamp/wg1nyqhhpat00u3xxdyg.jpg',
                    filename: 'YelpCamp/wg1nyqhhpat00u3xxdyg'
                }
            ]
        })
        await camp.save()
    }
}

seedDB()
    .then(() => {
        mongoose.disconnect()
        //console.log("Data Load!!!")
    })
