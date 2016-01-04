import { expect } from 'chai';
import collect from '../../src/index';

it('should generate assets', () => {
  const assets = collect({
    publicPath: '/foo',
    chunks: [ {
      id: 5,
      entry: true,
      files: [
        'bar.js',
        'baz.js',
      ],
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(2);
  expect(assets[0]).to.have.property('url', '/foo/bar.js');
});

it('should handle odd paths', () => {
  const assets = collect({
    publicPath: '/foo/',
    chunks: [ {
      id: 5,
      entry: true,
      files: [
        '/bar.js',
        '/baz.js',
      ],
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(2);
  expect(assets[0]).to.have.property('url', '/foo/bar.js');
});
