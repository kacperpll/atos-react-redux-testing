import React, { Fragment, memo } from 'react';

export const PageSize = memo({availableSizes, onChange}) => {
  return <>
    <span>items per page</span>
    {availableSizes.map( (size, idx) => <Fragment key={size}>
        { !!idx && ' | '}
        <span onClick={() => onChange(size)}>{ size }</span>
      </Fragment>
    )}
  </>
}