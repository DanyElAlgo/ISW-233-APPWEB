```
sample: Object
for instance: 
{
  title: asdasd,
  name: asdasd
  price: 123
}
```;
function initMockDB(sample, count = 100, page = 10) {
  let data = Array.from({ length: count }, (_, i) => {
    return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, `[Entry ${i}] - ${v}`]));
  });

  data = Array.from({ length: Math.ceil(data.length / page) }, (x, i) =>
    data.slice(i * page, i * page + page)
  );
  let index = -1;
  function getResult(pointer) {
    return new Promise((res) => {
      setTimeout(() => {
        pointer < 0 || pointer > data.length - 1 ? res([]) : res(data[(index = pointer)]);
      }, 1000);
    });
  }
  return {
    prev: () => getResult(index - 1),
    next: () => getResult(index + 1),
  };
}
