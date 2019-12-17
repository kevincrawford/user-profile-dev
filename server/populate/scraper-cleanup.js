cleanup = function(results) {
  const isPhoneNumber = value => /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/.test(value);
  $.each(results, function() {
    console.log(' ');
    console.log('-----------------');
    console.log(this.values[3]);
    const text = this.values[3].trim().replace(/(\r\n|\n|\r)/gm, '|||');
    const array = text.split('|||');
    const phoneIndex = array.findIndex(isPhoneNumber);

    if (phoneIndex > 0) {
      const department = array[2].trim();
      // console.log('phoneIndex: ', phoneIndex);
      // console.log(array[phoneIndex]);
      // console.log('isPhone: ', isPhoneNumber(array[phoneIndex]));
      const phone = array[phoneIndex].trim();
      const cityInfo = array[phoneIndex - 1].split(',');
      // console.log('cityInfo: ', cityInfo);
      const stateInfo = cityInfo[1].trim().split(' ');
      // console.log('stateInfo: ', stateInfo);
      const street = array[phoneIndex - 1].trim();
      // console.log('street: ', street);
      const city = cityInfo[0].trim();
      // console.log('city: ', city);
      const state = stateInfo[0].trim();
      // console.log('state: ', state);
      const zip = stateInfo[1].trim();
      // console.log('zip: ', zip);

      this.values[4] = department;
      this.values[5] = street;
      this.values[6] = city;
      this.values[7] = state;
      this.values[8] = zip;
      this.values[9] = phone;
    }
  });

  return results;
};
