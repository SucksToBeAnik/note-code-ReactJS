/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rvwqm3avqf1qxgh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zmvzpjnk",
    "name": "isFavourite",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rvwqm3avqf1qxgh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zmvzpjnk",
    "name": "isFavourite",
    "type": "bool",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
