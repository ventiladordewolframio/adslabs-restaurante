# documentation

"{id}" represents the number the id will be substituted and not part of the path

## CLIENT

GET /api/client/{id} : List Client by id

- only returns the object of a client specified by theid

---

GET /api/client?active=true : List all Clients

- when you don't inset the id, it will return all clients
- has the "active" optional parameter, that returns true or false

---

GET /api/client/top5orders?active=true : List all top 5 clients by order

- when specified "/top5orders", returns the top 5 clients that ordered the most units of product (not purchases)
- has the "active" optional parameter, that returns true or false

---

GET /api/client/top5spent?active=true : List all top 5 Clients by total spent

- when specified "/top5spent", retuens all the top 5 clients that spent the most money
- has the "active" optional parameter, that returns true or false

---

POST /api/client : Create Client
{
  "name": "string",
  "cpf": "string"
}

- the name must be within 3-100 char
- the CPF can be in any of the formats "12345678912" or "123-456-789.12" or "123.456.789.12"

---

PUT /api/client/{id} : Edit Client
{
  "name": "string",
  "cpf": "string"
}

- the name must be within 3-100 char
- the CPF can be in any of the formats "12345678912" or "123-456-789.12" or "123.456.789.12"

---

DELETE /api/client/{id} : Soft Delete Client

- active = false

## ITEM

GET /api/item/{id} : List Item by id

- only returns the object of the item specified by id

---

GET /api/item : List All Items

- when you don't inset the id it returns all items

---

GET /api/item/top : List All Items by Order Quantity

- the total amount of items sold is used instead of the amount of times they appear at the purchases table

---

POST /api/item : Create Item
{
  "name": "string",
  "price": int
}

- the name must be within 3-50 char
- the price is an int multiplyed by 100, because the two decimal cases needs to be stored on the database, ex: the price of 1099 = 10,99 (all prices must be in this format)
- the price can be 0, (intentional, if necessary on business logic)

---

PUT /api/item/{id} : Edit Item
{
  "name": "string",
  "price": int
}

- the name must be within 3-50 char
- the price is an int multiplyed by 100, because the two decimal cases needs to be stored on the database, ex: the price of 1099 = 10,99 (all prices must be in this format)
- the price can be 0, (intentional, if necessary on business logic)

---

DELETE /api/item/{id} : Delete Item

- Hard delete, will be removed from the database

## PURCHASE

GET /api/purchase/{id} : List Purchases by id

- returns only the object of an item specified by id

---

GET /api/purchase/ : List All Purchases

- when you dont insert the id it reurns all of them

---

POST /api/purchase/ : Create Purchase
{
  "clientId": int,
  "itemId": int,
  "quantity": int
}

- id of the client who made the purchase
- id of the item bought
- quantity of the item bought
- the price of the item is put on the database automatically, reflecting the current price of the item in the items table

---

PUT /api/purchase/ : Edit Purchase
{
  "clientId": int,
  "itemId": int,
  "quantity": int
}

---

DELETE /api/purchase/{id} : Delete Purchase

- Hard delete, will be removed from the database
