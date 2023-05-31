const commissionFields = [
  {
    labelText: 'Type',
    labelFor: 'kind',
    id: 'kind',
    name: 'kind',
    type: 'text',
    isRequired: true,
    placeholder: 'Portrait'   
  },
  {
    labelText: 'Price',
    labelFor: 'price',
    id: 'price',
    name: 'price',
    type: 'number',
    isRequired: true,
    placeholder: '10'   
  },
  {
    labelText: 'Duration(days)',
    labelFor: 'duration',
    id: 'duration',
    name: 'duration',
    type: 'number',
    isRequired: true,
    placeholder: '7'   
  }
]
export { commissionFields }