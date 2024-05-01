import React from 'react';

function FigmaEmbed({url}) {
  const iframeHTML = {
    __html: url
  };

  return <div className='FigmaEmbed' dangerouslySetInnerHTML={iframeHTML} />;
}

export default FigmaEmbed;
