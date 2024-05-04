/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "srk6jtmr4hy3igl",
    "created": "2024-05-02 22:49:57.894Z",
    "updated": "2024-05-02 22:49:57.894Z",
    "name": "notes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3kpqbkwd",
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
        "id": "grotkj7c",
        "name": "body",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 5,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "efd2vook",
        "name": "isFavourite",
        "type": "bool",
        "required": false,
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
  const collection = dao.findCollectionByNameOrId("srk6jtmr4hy3igl");

  return dao.deleteCollection(collection);
})
