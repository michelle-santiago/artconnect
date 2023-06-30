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
    name: 'p_price',
    type: 'number',
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
  },
  {
    labelText: 'Not Paid',
    labelFor: 'bordered-radio-1',
    id: 'bordered-radio-1',
    name: 'payment_status',
    type: 'radio',
    isRequired: true 
  },
  {
    labelText: 'Paid',
    labelFor: 'bordered-radio-2',
    id: 'bordered-radio-2',
    name: 'payment_status',
    type: 'radio',
    isRequired: true 
  },
  {
    labelText: '',
    labelFor: 'bordered-radio-3',
    id: 'bordered-radio-3',
    name: 'payment_status',
    type: 'radio',
    isRequired: true 
  },
]
export { commissionProcessFields }