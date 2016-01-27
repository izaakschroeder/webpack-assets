import { expect } from 'chai';
import collect from '../../src/index';

// Example: https://raw.githubusercontent.com/webpack/analyse/master/app/pages
// /upload/example.json

it('should generate assets', () => {
  const assets = collect({
    publicPath: '/foo',
    assets: [ {
      name: 'bar.js',
      size: 1058,
      chunks: [ 0 ],
      chunkNames: [],
      emitted: true,
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('url', '/foo/bar.js');
});

it('should handle odd paths', () => {
  const assets = collect({
    publicPath: '/foo/',
    assets: [ {
      name: '/bar.js',
      size: 1058,
      chunks: [ 0 ],
      chunkNames: [],
      emitted: true,
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('url', '/foo/bar.js');
});

it('should generate `contentType`', () => {
  const assets = collect({
    publicPath: '/foo/',
    assets: [ {
      name: 'bar.js',
      size: 1058,
      chunks: [ 0 ],
      chunkNames: [],
      emitted: true,
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('contentType', 'application/javascript');
});

it('should generate `hash`', () => {
  const assets = collect({
    publicPath: '/foo/',
    hash: '123abc',
    assets: [ {
      name: 'foo.js',
      size: 1058,
      chunks: [ 0 ],
      chunkNames: [],
      emitted: true,
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('hash', '123abc');
});

it('should generate `name`', () => {
  const assets = collect({
    publicPath: '/foo/',
    assets: [ {
      name: 'foo/bar.js',
      size: 1058,
      chunks: [ 0 ],
      chunkNames: [],
      emitted: true,
    } ],
  });
  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(1);
  expect(assets[0]).to.have.property('name', 'foo/bar.js');
});

it('should order entrypoints first', () => {
  const assets = collect({
    publicPath: '/foo/',
    assets: [ {
      name: '1.js',
      size: 1058,
      chunks: [ 0, 2 ],
      chunkNames: [],
      emitted: true,
    }, {
      name: '2.js',
      size: 1058,
      chunks: [ 1 ],
      chunkNames: [],
      emitted: true,
    } ],
    chunks: [ {
      id: 0,
    }, {
      id: 1,
      entry: true,
    }, {
      id: 2,
    } ],
  });

  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(2);
  expect(assets[0]).to.have.property('name', '2.js');
  expect(assets[1]).to.have.property('name', '1.js');
});

it('should order fall back to chunk order for multiple entrypoints', () => {
  const assets = collect({
    publicPath: '/foo/',
    assets: [ {
      name: '1.js',
      size: 1058,
      chunks: [ 0, 2 ],
      chunkNames: [],
      emitted: true,
    }, {
      name: '2.js',
      size: 1058,
      chunks: [ 1 ],
      chunkNames: [],
      emitted: true,
    } ],
    chunks: [ {
      id: 0,
    }, {
      id: 1,
      entry: true,
    }, {
      id: 2,
      entry: true,
    } ],
  });

  expect(assets).to.be.an.instanceof(Array);
  expect(assets).to.have.length(2);
  expect(assets[0]).to.have.property('name', '1.js');
  expect(assets[1]).to.have.property('name', '2.js');
});

it('should return empty array with no assets', () => {
  expect(collect({})).to.have.length(0);
});
