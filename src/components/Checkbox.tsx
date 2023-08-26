import React from "react";

export interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = React.memo(({ value, onChange, disabled }: Props) => {
  const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    <input
      type="checkbox"
      disabled={disabled}
      checked={value}
      onClick={onClick}
    />
  );
});
