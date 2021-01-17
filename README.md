## How to spin it up?
1. Use Yarn or NPM whichever suits you
2. Install the dependencies using ` yarn` or `npm install`
3. Run the API server using `yarn dev` or `npm run dev`

## API
json-server which serves you an API you can use. It's optional to use, and you
of course provide your own API if you would like to.

 *  `GET`, `POST` `http://localhost:8080/api/products`

 * `PUT` `http://localhost:8080/api/products/:id` 
    - Example:
        ``` json
          {
            "name": "Hammer",
            "description": " This is a very nice Hammer",
            "price": 200
          }
        ```

* `DELETE` `http://localhost:8080/api/products/:id`
    - Example:
        ```json
          {
            "name": "Hammer",
            "description": " This is a very nice Hammer",
            "price": 200
          } 
        ```
* `GET`, `POST` `http://localhost:8080/api/users`
    - Example:
      ```json
        {
          "name": "Test User 1",
          "access": "W",
          "orders": [
            {
              "id": 1,
              "products": [
                {
                  "id": 1,
                  "quantity": 20,
                  "totalPrice": 122,
                  "discount": 20
                },
                {
                  "id": 2,
                  "quantity": 12,
                  "totalPrice": 178,
                  "discount": 0
                }
              ]
            }
          ]
        }
      ``` 

* `PUT` `http://localhost:8080/api/users/:id` 
    - Example:
      ```json 
        {
          "name": "Test User 1",
          "access": "W",
          "orders": [
            {
              "id": 1,
              "products": [
                {
                  "id": 1,
                  "quantity": 20,
                  "totalPrice": 122,
                  "discount": 20
                },
                {
                  "id": 2,
                  "quantity": 12,
                  "totalPrice": 178,
                  "discount": 0
                }
              ]
            }
          ]
        }
      ```

* `DELETE` `http://localhost:8080/api/users/:id`