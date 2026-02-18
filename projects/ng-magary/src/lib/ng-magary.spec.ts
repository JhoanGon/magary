import * as ngMagaryExports from './ng-magary';

describe('ng-magary exports', () => {
  it('should expose public members', () => {
    expect(Object.keys(ngMagaryExports).length).toBeGreaterThan(0);
  });
});
