import { ShortenIdPipe } from './shorten-id.pipe';

describe('ShortenIdPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortenIdPipe();
    expect(pipe).toBeTruthy();
  });
});
