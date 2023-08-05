# Mini Rutter Project - GMT Interview

## Setup
1.  (Optional) Run `docker compose up -d` to create a docker container with database
> user: johndoe
> pass: doe123
> db: interview

2. Copy `.env.dev` into a new `.env` file, and adjust your credentials for api and database.

3. Install dependencies with `npm install`

4. Run `npm migrate:dev`

5. Start the api with `npm run start:dev`

***

## Pagination
``To get a specific page, just insert "page" query param, ex:
http://localhost:3333/products?page=2
``

***

## Routes
`http://localhost:3333/products/sync`

`http://localhost:3333/orders/sync`

`http://localhost:3333/orders`

`http://localhost:3333/products`
