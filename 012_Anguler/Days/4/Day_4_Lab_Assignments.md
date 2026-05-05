# Day 4 Lab Assignments: Angular Routing & Services

Complete these assignments based on your previous lab.

## 1. Add a Custom Service: 'Products Service'
* **a.** In the service, add the following functions (depending on the classes you created before):
    * **i.** `getProductsByCatID(catID): Products[]`
    * **ii.** `getProductByID(prodID): Product`
* **b.** In the **Products Component**, use this new service instead of using classes directly.

## 2. Add Routing to Your Project
* **a.** Add the following links and components:
    * **i.** **Home**: Static page with any data.
    * **ii.** **About us**: Static page with any data.
    * **iii.** **Contact us**: Static page with any data.
    * **iv.** **Products**: Opens the Shopping Cart component.
    * **v.** **Default route**: When user writes no route, redirects to `/home` route.
    * **vi.** **Wildcard route**: A Component to handle any wrong routes (displays when user writes a route that doesn't exist).
* **b.** Remember to:
    * **i.** Add the `<router-outlet>` in the component which you'll display the components you navigate to.
    * **ii.** Change the links and add `routerLink` attribute.
    * **iii.** In all links add `RouterLinkActive`.
        * **(1) Why??** (To provide visual feedback for the active route).

## 3. Add a route 'products/:id'
* **a.** Add the route in the router module routes.
* **b.** In your **Shopping Cart** component, add a button 'details' in front of each product, that navigates to the route: `'product/:id'`.
    * **i.** You may need to use **Router service**, how?
        * **(1)** `navigate()` function in router service, return a promise, try it to print any message in the console after the navigation is completed.
    * **ii.** Can you do it by a link instead?
* **c.** Create **ProductDetails** Component, that receives an id and display the given product details.
* **d.** In the **ProductDetails** Component, get the sent ID, and display the given product details.
    * **i.** You'll need to use **ActivatedRoute** service, how?
* **e.** Add **(Go back)** button, that uses browser’s back to go back to the previous page.

## Bonus:
* **a.** Add new 2 links in nave bar (**login, logout**) and handle the required login, logout components that use the login service to simulate the login and logout logic.
* **b.** Create a router guard (**CanActivate guard**), and use the `UserAuthService` on it to check:
    * **i.** If the user is logged in: allow him to open admin components (Add, delete and edit product).
    * **ii.** If not logged in: don't allow him to open admin components and redirect him to the login page.
* **c.** You may refer to the following **route guards** tutorial: [Angular Route Guards](https://angular.io/guide/router#milestone-5-route-guards)
* **d.** **[Big Bonus]** Use `BehaviorSubject`, to show the login status in the navbar (to display: ‘Welcome + user name’ and Logout link when user is logged in, and login link only when is logged out).
* **e.** You can also refer to the following tutorial for login and registration using angular: [Jason Watmore's Tutorial](https://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial)

## Additional Challenge:
* **2.** Try to display the product details in **Angular Material Dialog** instead of new Component.
