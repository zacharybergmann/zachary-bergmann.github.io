#Using Sequelize ORM to manage relationships in a PostgreSQL database

Hello everyone, glad to have you back and reading again. Today I want to talk briefly about Sequelize, an ORM for PostgreSQL, MySQL, SQLite, and MSSQL. I have been using it on a project recently for an Anki style language learning app for managing relationships in our PostgreSQL database. To give a reasonable idea what type of schema I am working with, I have included a simplified schema below that shows the general relationships that we hoped to manage with Sequelize.

So, I will briefly explain the schema and why I organized it in the above manner. If you are unfamiliar with Anki, you should look it up now as it should help a bit with the reasoning for certain information in the database though I will try my best here. So, in this schema, users have many decks, these decks are specific to the user (hold the user_id foreign key, therefore a one-many relationship). Next, we have decks and cards. Since I wanted to keep from making user specific cards to reduce data usage, I chose a many to many relationship: cards are in many decks, decks have many cards. To manage this many to many relationship, I made a join table called deck_cards. The deck_cards table is where I chose to put the Anki specific information for the app at. Because Anki does interval training with cards depending upon user results, I wanted the point where a specific card in a specific deck (user specific deck) to hold the interval training information. In this way, the user could have a card in multiple of their decks and still train that deck at different intervals. This is one thing that we dicussed changing (moving Anki data to the user_card table to make the training specific to the user and the card instead of what deck it is in) but we chose for now not to concern ourselves with that. Most likely, that would be a version 2 change since it would be nice to get familiar with a card in one deck and have that interval carry over to any other decks that the parent card in referenced in.

After that, users have an obvious relationship with cards though it is not used much. It is a many to many relationship since these are “source” cards. Therefore, once again a join table is required as users have many cards and cards have many users. With that, I think I have fairly well covered the schema and will continue on toward Sequelize and how it was used. Sequelize, as mentioned before, is an ORM (Object Relational Mapper). It is used (in this case by a NodeJS server) to perform queries to a database, insert data, delete data, etc…basically CRUD operations. Without going too far in depth, I will show the basic configuration of my schema as well as a couple of queries that I made that will hopefully shed some light on the more interesting parts of Sequelize.

```sh
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
//NOTE: DATABASE_URL should be of this format:
//  postgres://postgres:yourpassword@localhost:5432/yourdbname
```

This section of code above is used to get Sequelize (from npm) and connect the database to the server for table setup and queries. PostgreSQL uses port 5432 by default and also postgres is the default user. You should use psql in your command line to interface with the database. You can use psql to check debug and test while testing your database interfacing functions. After you have created the sequelize instance that is connected to your database, we can start creating schemas.

```sh
const Sequelize = require('sequelize');
const sequelize = require('../../server').sequelize;
const Deck = sequelize.define('deck', {
  name: {
    type: Sequelize.STRING,
  },
  stars: {
    type: Sequelize.INTEGER,
  },
}, {
  underscored: true,
});
module.exports = Deck;
```

This section of code is used to create a deck table (called Deck in Sequelize). It by default has an id, then I added name, and stars. Since I exported from my server.js file, I reference Sequelize and sequelize here. I chose to define all schemas in this manner (including deck_card and user_card join tables) because the join tables have extra functionality when they are explicitly defined. I did not know whether this was the correct way to do this when I started but I never regretted it afterwards since it allowed me to interface with the join tables in ways that I would not have been able to with the built-in Sequelize getters and setters. After defining all tables, I needed to define the relationships between them so that they can be joined and have CRUD operations done as a group.

```sh
User.hasMany(Deck, { onDelete: 'CASCADE' });
Card.belongsToMany(Deck, { 
  onDelete: 'CASCADE',
  through: DeckCard
});
Card.belongsToMany(User, {
  onDelete: 'CASCADE',
  through: UserCard
});
Deck.belongsTo(User, { onDelete: 'CASCADE' });
Deck.belongsToMany(Card, {
  onDelete: 'CASCADE',
  through: DeckCard
});
User.belongsToMany(Card, {
  onDelete: 'CASCADE',
  through: UserCard
});
```

In the above join, note that it is important to define relationships both ways for tables. This allows you to query either direction from a pair of tables. I also added a note to cascade on delete and defined the join tables. As mentioned before, I created user_card (known in Node as UserCard) and deck_card (aka DeckCard). These are defined above using the through property that tells the relationship from one model to another “through” another table. With that and defining belongsToMany multiple directions, my schema was good to go!

```sh
addMultDecksAndUserSpecsToJoinTbl: async (user_id, decks, res) => {
  try {
    await Promise.all(decks.map(async (deckId) => {
      const origDeck = await Deck.findOne({
        where: { id: deckId }
      });
      const name = origDeck.name;
      const createdDeck = await Deck.create({
        user_id,
        name,
        stars: 0
      });
      const joinTableCardIdsArr = await DeckCard.findAll({
        where: { deck_id: deckId },
      });
      await Promise.all(joinTableCardIdsArr.map(async (joinObj) => {
        const card = await Card.findOne({
          where: { id: joinObj.card_id},
        });
        await card.addUser(user_id);
        await createdDeck.addCard(card, {
          timeInterval: 3000,
          phrase: joinObj.phrase,
          lastVisited: (new Date()).toISOString(),
          card_id: joinObj.card_id,
          deck_id: joinObj.deck_id,
        });
      }));
    }));
    return res.status(200).send('Successfully added decks!');
  } catch (err) {
    return res.status(400).send(err);
  }
},
// Below is the format of the request to the API server with this content:
{
 "id":2,
 "decks":"[1, 2, 3, 4]"
}
```

So, now that the nitty gritty is done, I will show a couple of the more interesting functions that I used to query the database and perform operations for our Anki-style app. The above function is used (as named) to add multiple decks to a user as well as all card associations that are entailed with having that card. Since cards are unique and not user specific, this means that basically the join table (deck_cards) needs to be updated as well as the deck table. Remember that we are creating a deck and that decks are user specific! So, from the top, I start using a try-catch to use the new async await functionality in Node. Because I want to wait for the map function to go through the array of “decks” which are actually deck_ids, I turned it into a Promise that could be awaited. Inside of that promise I get the original deck, use its information to create a new deck, then go to the join table (deck_cards) and get all card_ids that have the original deck’s deck_id. I do this because each of these cards needs to be referenced in the join table as new entries for user specific details (Anki information) in the join table.
Once I get this reponse (an array of card objects), I wrap another promise around the map function mapping through all of the cards that were returned. For each card, I need the original card so that I can use the association properties that Sequelize gives to the tables that are on each side of the join table. With the card, I used the card (instance) card.getUser() to access the join table between card and user. This allows me to set the user_id in the join table and by association, the card_id as well when this is called. Finally, I make all of my additions to the deck_card join table. After this is all complete, the return is sent out with a success message. If it had failed at any step inside of this whole operation, the catch would have caught the error and sent it as a response instead. Pretty interesting operation huh?

```sh
getDeckByUserId: async (id, res) => {
  try {
    const decks = await Deck.findAll({
      include: [
        {
          model: Card,
          attributes: ['imgUrl'],
          through: { attributes: [] },
        },
      ],
      where: { user_id: id },
      attributes: ['id', 'name', 'stars'],
    });
    return res.status(200).send(decks);
  } catch (err) {
    return res.status(400).send(err);
  }
},
```

This query is a used to get all decks by user_id. Fairly simple right? Well I also wanted only certain things to be included in the response from the server that is sent back so it gets slightly more interesting. That and there is also the fact that we are making our main join: Deck, DeckCard, and Card! For this particular query, we wanted to display the image associated with each card as a background to the card name (in list format) in the app. To do this, I needed to use the user_id on the deck to get all of the user’s decks. Once I have the user’s decks, I needed the imgUrl for each of these cards that is in that deck. Make sense? Ok well lets look at the code. So, since I am returning decks, I start my query at decks (will get a return array of decks with user_id matching the id specified). Next, I join the Decks model (table) with the card table. I specify that I only want the imgUrl from the Card model. I also have to specify how I made that join since it is not a direct join. To do this, I note that there is a through table that I do not want any information from (just use it for its relationship). Finally I specify my deck query (where the deck’s user_id property is equal to id). A bit of error handling again and I have my response from the database in the format that I would like with the help of attributes filters.
I think with that I am going to wrap things up. Learning Sequelize for this project has been an experience, Sequelize has difficult to interpret docs and the amount of tickets floating around with different questions/issues is limited. Most of the results that I have had with Sequelize have been centered around very very good Google-ing, reading the couple tickets that may slightly relate to my issues, and reading the docs to still not quite find what I am looking for. After that, I just started conjuring with the all the pieces that I have seen and try to put it together to make something that we need happen. This has been a great change of pace for me as someone who thrives with following style to the T per the docs and writing code that follows those specifications. Even though I prefer and do well at interpreting documentation quickly to write clean code, I have to say that conjuring solutions is a fun part of the puzzle too. Hopefully I have helped remove a bit of the haziness around Sequelize and you can have some success with it too!
If you have any questions or comments, please feel free to leave a message below. I will try to respond as soon as I can! Thanks for reading!

