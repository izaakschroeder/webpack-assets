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

it('should generate `contentType`', () => {
  const assets = collect({
    publicPath: '/foo/',
    chunks: [ {
      id: 5,
      files: [ '/bar.js' ],
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('contentType', 'application/javascript');
});

it('should generate `hash`', () => {
  const assets = collect({
    publicPath: '/foo/',
    chunks: [ {
      id: 5,
      hash: '123abc',
      files: [ '/bar.js' ],
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('hash', '123abc');
});

it('should generate `name`', () => {
  const assets = collect({
    publicPath: '/foo/',
    chunks: [ {
      id: 5,
      files: [ '/foo/bar.js' ],
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('name', 'bar.js');
});

it('should order entrypoints first', () => {
  const assets = collect({
    publicPath: '/foo/',
    chunks: [ {
      id: 5,
      files: [ '/0.js' ],
    }, {
      id: 7,
      entry: true,
      files: [ '/1.js', '/2.js' ],
    }, {
      id: 9,
      files: [ '/3.js' ],
    } ],
  });

  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(4);
  expect(assets[0]).to.have.property('name', '1.js');
  expect(assets[1]).to.have.property('name', '2.js');
});
