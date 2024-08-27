const Place = require("../models/places");
const mongoose = require("mongoose");

const samplePlaces = [
  {
    name: "Eiffel Tower",
    visited: true,
    information:
      "Iconic iron lattice tower on the Champ de Mars in Paris, France. It was named after the engineer Gustave Eiffel, whose company designed and built the tower.",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/eb/f0/92.jpg",
  },
  {
    name: "Machu Picchu",
    visited: false,
    information:
      "An Incan citadel set high in the Andes Mountains in Peru, built in the 15th century and later abandoned. It's renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar.",
    image:
      "https://www.boletomachupicchu.com/gutblt/wp-content/uploads/2023/04/machu-picchu-informacion-full.jpg",
  },
  {
    name: "Taj Mahal",
    visited: true,
    information:
      "An ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/2560px-Taj_Mahal_%28Edited%29.jpeg",
  },
  {
    name: "Great Wall of China",
    visited: false,
    information:
      "A series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built across the historical northern borders of China to protect against nomadic invasions.",
    image:
      "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg",
  },
  {
    name: "Petra",
    visited: true,
    information:
      "A famous archaeological site in Jordan's southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs.",
    image:
      "https://i.natgeofe.com/n/69e2cf60-ad59-4d20-bdd1-dc96f40ab4e8/petra-world-heritage-jordan.jpg?w=2560&h=1708",
  },
  {
    name: "Statue of Liberty",
    visited: false,
    information:
      "A colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg",
  },
  {
    name: "Christ the Redeemer",
    visited: true,
    information:
      "An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by French sculptor Paul Landowski and built by Brazilian engineer Heitor da Silva Costa.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/1024px-Christ_the_Redeemer_-_Cristo_Redentor.jpg",
  },
  {
    name: "Colosseum",
    visited: true,
    information:
      "An ancient amphitheater in Rome, Italy, the largest ever built, and is considered one of the greatest works of architecture and engineering.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/2560px-Colosseo_2020.jpg",
  },
  {
    name: "Pyramids of Giza",
    visited: false,
    information:
      "The oldest of the Seven Wonders of the Ancient World, located in the Giza pyramid complex in Egypt.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1200px-Kheops-Pyramid.jpg",
  },
  {
    name: "Acropolis of Athens",
    visited: true,
    information:
      "An ancient citadel on a rocky outcrop above the city of Athens, containing the remains of several ancient buildings of great architectural and historic significance.",
    image:
      "https://cdn-imgix.headout.com/microbrands-banner-image/image/b698f96a3bf7e35418940973f33c4708-The%20Acropolis%20of%20Athens.jpeg",
  },
  {
    name: "Sagrada Família",
    visited: false,
    information:
      "A large unfinished Roman Catholic minor basilica in Barcelona, Spain, designed by Catalan architect Antoni Gaudí.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Sagfampassion.jpg/1920px-Sagfampassion.jpg",
  },
  {
    name: "Mount Fuji",
    visited: false,
    information:
      "An active stratovolcano in Japan, located about 100 kilometers southwest of Tokyo. It is the highest peak in Japan.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Views_of_Mount_Fuji_from_Ōwakudani_20211202.jpg/544px-Views_of_Mount_Fuji_from_Ōwakudani_20211202.jpg",
  },
  {
    name: "Golden Gate Bridge",
    visited: true,
    information:
      "A suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1280px-GoldenGateBridge-001.jpg",
  },
  {
    name: "Sydney Opera House",
    visited: true,
    information:
      "A multi-venue performing arts center in Sydney, Australia, one of the 20th century's most famous and distinctive buildings.",
    image:
      "https://media.architecturaldigest.com/photos/63d93cc1e12ae5dbc1f1f7aa/16:9/w_2580%2Cc_limit/GettyImages-982774858.jpg",
  },
  {
    name: "Leaning Tower of Pisa",
    visited: false,
    information:
      "The freestanding bell tower of the cathedral of the Italian city of Pisa, known worldwide for its unintended tilt.",
    image:
      "https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MjAzNjI4NTUyMTk5ODc0NDkx/the-leaning-tower-of-pisa-to-visit-or-not-to-visit.webp",
  },
  {
    name: "Stonehenge",
    visited: false,
    information:
      "A prehistoric monument on Salisbury Plain in Wiltshire, England, consisting of a ring of standing stones, each around 13 feet high.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/1920px-Stonehenge2007_07_30.jpg",
  },
  {
    name: "Angkor Wat",
    visited: false,
    information:
      "A temple complex in Cambodia and the largest religious monument in the world by land area, originally constructed as a Hindu temple for the Khmer Empire.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/Angkor_Wat_Temple.jpg",
  },
  {
    name: "Alhambra",
    visited: true,
    information:
      "A palace and fortress complex located in Granada, Andalusia, Spain, originally constructed as a small fortress in 889 AD on the remains of Roman fortifications.",
    image:
      "https://cdn-imgix.headout.com/media/images/4f89d6eeb324e19ee61af4fb172380e9-18731-granada-the-alhambra-palace---skip-the-line-e-ticket-with-audio-tour-on-your-phone-04.jpg",
  },
  {
    name: "Neuschwanstein Castle",
    visited: false,
    information:
      "A 19th-century historicist palace on a rugged hill above the village of Hohenschwangau in southwest Bavaria, Germany. Commissioned by Ludwig II of Bavaria as a retreat and in honor of Richard Wagner.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Schloss_Neuschwanstein_2013.jpg/500px-Schloss_Neuschwanstein_2013.jpg",
  },
];

const getPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    console.error("Error retrieving places:", error);
    res.status(500).send("Internal server error");
  }
};

const getPlace = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.findById({ _id: id });
    if (!place) {
      return res.status(401).send("Place does not exists");
    }
    return res.status(200).json({ message: "success", place });
  } catch (error) {
    console.error("Error retrieving random places:", error);
    res.status(500).send("Internal server error");
  }
};

const getRandomPlaces = async (req, res) => {
  try {
    const places = await Place.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json(places);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const updatePlaceVisit = async (req, res) => {
  const { id } = req.params;

  try {
    const updatePlace = await Place.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).json(updatePlace);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Place.deleteMany({});

    // Insert new data
    await Place.insertMany(samplePlaces);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

module.exports = {
  getPlaces,
  getPlace,
  updatePlaceVisit,
  getRandomPlaces,
  seedDatabase,
};
