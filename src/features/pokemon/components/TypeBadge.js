import React from 'react';
import { StringUtils } from '../../../shared/utils/StringUtils';
import { TypeColors } from '../constants/TypeColors';

export const TypeBadge = ({ type }) => {
  const backgroundColor = TypeColors.getBackgroundColor(type);

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor }}
    >
      {StringUtils.capitalize(type)}
    </span>
  );
};