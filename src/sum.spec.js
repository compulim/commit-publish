import sum from './sum';

test('sum', () => {
  const actual = sum(1, 2);

  expect(actual).toBe(3);
});
