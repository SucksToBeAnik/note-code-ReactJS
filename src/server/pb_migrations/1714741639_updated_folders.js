/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("90nru250yuvbivj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jco5og5a",
    "name": "codes",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "rvwqm3avqf1qxgh",
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
  collection.schema.removeField("jco5og5a")

  return dao.saveCollection(collection)
})
