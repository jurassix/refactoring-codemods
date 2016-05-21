// @flow
type clint = {
  firstName: string,
};
type ayres = {
  lastName: string,
};

function foo(): Array<string> { return [''];}

export const bar: Array<string> = [...foo(), ...foo(), ...foo()];

export const goo: Array<string> = [].concat(foo());

export function coo(): Array<clint> {
  return [{
    firstName: 'Clint',
  }];
}

export const boo: Array<clint> = [...coo()];
