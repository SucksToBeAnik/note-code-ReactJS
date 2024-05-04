/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "90nru250yuvbivj",
    "created": "2024-05-02 22:52:38.913Z",
    "updated": "2024-05-02 22:52:38.913Z",
    "name": "folders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fdkmcr3c",
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
        "id": "245y6etv",
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
  const collection = dao.findCollectionByNameOrId("90nru250yuvbivj");

  return dao.deleteCollection(collection);
})
