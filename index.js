import fs from 'fs';
import axios from 'axios';
import prompt from "prompt";


const collection = fs.readFileSync("./collection.txt");
const collectionLines = (collection.toString()).split("\n");
const uniqueCollection = Array.from(new Set(collectionLines));

const YGOProDeckEndpoint = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

const IDs = uniqueCollection.join();

prompt.start();
const {name, type, atk, def, level, race, attribute, cardset, archetype, sort, staple} = await prompt.get(['name', 'type', 'atk', 'def', 'level', 'race', 'attribute', 'cardset', 'archetype', 'sort', 'staple']);

const requestUrl = (`${YGOProDeckEndpoint}?`)+(name && `&fname=${name}`)+(type && `&type=${type}`)+(atk && `&atk=${atk}`)+(def && `&def=${def}`)+(level && `&level=${level}`)+(race && `&race=${race}`)+(attribute && `&attribute=${attribute}`)+(cardset && `&cardset=${cardset}`)+(archetype && `&archetype=${archetype}`)+(sort && `&sort=${sort}`)+(staple && `&staple=${staple}`);

const response = await axios.get(requestUrl);

const responseCards = response.data.data;
const filteredCollection = responseCards.filter((card) => {return IDs.includes(card.id)});

filteredCollection.forEach((card) => {
    console.log(card.name);
});