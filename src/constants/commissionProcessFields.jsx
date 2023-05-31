const commissionProcessFields = [
  {
    labelText: 'Phase',
    labelFor: 'phase',
    id: 'phase',
    name: 'phase',
    type: 'text',
    isRequired: true,
    placeholder: 'Coloring'   
  },
  {
    labelText: 'Price',
    labelFor: 'price',
    id: 'price',
    name: 'price',
    type: 'number',
    isRequired: false,
    placeholder: '7'   
  },
  {
    labelText: 'Payment Status',
    labelFor: 'payment_status',
    id: 'payment_status',
    name: 'payment_status',
    type: 'text',
    isRequired: false,
    placeholder: '7'   
  },
  {
    labelText: 'Remarks',
    labelFor: 'remarks',
    id: 'remarks',
    name: 'remarks',
    type: 'text',
    isRequired: false,
    placeholder: 'I want to'   
  }
]
export { commissionProcessFields }