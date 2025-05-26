# Aplicaciones Web I - Ejercicio Observer

1. Add contenteditable attribute to section with a class name card__body__content
2. Create a MutationObserver with the following parameters that would allow us to track text changes in TextNodes:
  - characterData: true
  - subtree: true 
3. Implement callback for MutationObserver
4. Observer text section for each card
5. Use single observer for all rendered card 

Use the db file and the mockDB for generating fake data. for example:

```js
const db = initMockDB({
  title: "Web app I",
  body: "Intersection Observer"
});

// to get the next data
const data = await db.next();
```