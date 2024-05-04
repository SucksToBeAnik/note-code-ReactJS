/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90nru250yuvbivj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "11pisjcd",
    "name": "notes",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "srk6jtmr4hy3igl",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90nru250yuvbivj")

  // remove
  collection.schema.removeField("11pisjcd")

  return dao.saveCollection(collection)
})
