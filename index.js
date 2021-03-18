import fs from 'fs';
import axios from 'axios';



const collection = fs.readFileSync("./collection.txt");
const collectionLines = (collection.toString()).split("\n");
const uniqueCollection = Array.from(new Set(collectionLines));

const YGOProDeckEndpoint = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

const IDs = uniqueCollection.join();

const requestUrl = `${YGOProDeckEndpoint}?id=${IDs}`;

const testCard = await axios.get(requestUrl);

console.log(testCard);