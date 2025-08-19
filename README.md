Important note: The backend for this demo app is not very robustly written. Therefore, if body of the POST request for submitting an order is not correctly formatted, the backend may crash. Obviously the backend still needs refinement...

Here is an example of a correctly formatted body for submitting an order:
{"order":{"items":[{"id":"m2","name":"Margherita Pizza","price":"12.99","description":"A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.","image":"images/margherita-pizza.jpg","count":1}],"customer":{"name":"John","email":"test@example.com","street":"some street","postal-code":"1066","city":"LA"}}}
