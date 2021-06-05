import { Carousel } from 'antd';
import React from 'react';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export const Order = () => (
  <Carousel effect="fade">
    <div>
      <h3 style={contentStyle as any}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle as any}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle as any}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle as any}>4</h3>
    </div>
  </Carousel>
);
