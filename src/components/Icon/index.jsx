import React, { useState, useEffect } from 'react';

const Icon = ({ type }) => {
  const [iconPath, setIconPath] = useState(null);

  useEffect(() => {
    import(`../../images/icons/${type}.svg`)
      .then((icon) => {
        setIconPath(icon.default);
      })
      .catch((error) => {
        console.error('Failed to load icon:', error);
      });
  }, [type]);

  if (!iconPath) {
    return null;
  }
  return (
    <img
      src={iconPath}
      alt='icon'
      style={{
        width: 20,
        height: 20,
      }}
    />
  );
};

export default Icon;
