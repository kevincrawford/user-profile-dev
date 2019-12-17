import { combineValidators, isRequired } from 'revalidate';

const validate = combineValidators({
  type: isRequired({ message: 'Company Type is required' }),
  size: isRequired({ message: 'Company Size is required' }),
  test: isRequired({ message: 'Company Test is required' })
});

export default validate;
