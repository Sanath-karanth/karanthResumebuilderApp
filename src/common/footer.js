import React, { memo, useState, useEffect, Fragment } from 'react';
import '../css/footer.css'

const FooterScreen = memo(() => {
  return (
    <Fragment>
        <div className='MainContainer-footer'>
            <div className='SubContainer-footer'>
                <div className='HeadContainer-footer'>
                    <h1>Footer</h1>
                </div>
            </div>
        </div>
    </Fragment>
  )
})

export default FooterScreen;