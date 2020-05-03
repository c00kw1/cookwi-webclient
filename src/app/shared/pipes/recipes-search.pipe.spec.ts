import { RecipesSearchPipe } from './recipes-search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new RecipesSearchPipe();
    expect(pipe).toBeTruthy();
  });
});
