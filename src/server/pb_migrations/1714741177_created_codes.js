/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "rvwqm3avqf1qxgh",
    "created": "2024-05-03 12:59:37.710Z",
    "updated": "2024-05-03 12:59:37.710Z",
    "name": "codes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ooefti6j",
        "name": "title",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "s4be7qmm",
        "name": "body",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zmvzpjnk",
        "name": "isFavourite",
        "type": "bool",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rvwqm3avqf1qxgh");

  return dao.deleteCollection(collection);
})
