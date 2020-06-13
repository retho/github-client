// * source: https://commons.wikimedia.org/wiki/File:Blank_map_of_Russia-gray.svg

import regions from './dataRegions';

const federalDistrictIds = [
  'Central',
  'Southern',
  'Northwestern',
  'FarEastern',
  'Siberian',
  'Urals',
  'Volga',
];

export default federalDistrictIds.map((fdId) => ({
  id: fdId,
  regions: regions.filter((x) => x.fdId === fdId),
}));
