import React, {memo} from 'react';

const ProductExtraInfoItem = ({title, description, icon}) => {
  return (
    <div className="w-full p-3 rounded-md border border-gray-300 flex items-center gap-4">
      <div className="text-white text-xl bg-grayDark w-10 h-10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <span className="text-sm">
          {title}
        </span>
        <p className="text-xs text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default memo(ProductExtraInfoItem);
