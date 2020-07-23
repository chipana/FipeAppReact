export default class VehicleSchema {
  static schema = {
    name: 'Vehicle',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      value: 'double',
      trademark: 'string',
      model: 'string',
      modelYear: 'int',
      code: 'string',
      reference: 'string',
      fuel: 'char',
    },
  };
}
