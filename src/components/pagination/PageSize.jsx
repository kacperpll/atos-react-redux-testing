import React, { Fragment, memo, useState} from 'react';

export const PageSize = memo(({availableSizes, onChange, initialSize}) => {
  const init = initialSize ? initialSize : availableSizes[0]
  // const init = initialSize || availableSizes[0]
  const [selectedSize, setSelectedSize] = useState(init)
  return <>
    <span>items per page</span>
    {availableSizes.map( (size, idx) => <Fragment key={size}>
        { !!idx && ' | '}
        <span className={ selectedSize === size ? 'selected' : ''} 
          onClick={()=> {
          if(selectedSize !== size){
            onChange(size)
            setSelectedSize(size)
          }
        }}>{ size }</span>
      </Fragment>
    )}
  </>
})