'use client';

import React from 'react';
import { Select, Input } from 'antd';
import type { SelectProps } from 'antd';

export interface Option<T extends string | number = string> {
  label: React.ReactNode;
  value: T;
}

export interface SearchFormProps<T extends string | number = string> {
  options: Option<T>[];
  selectValue: T;
  onSelectChange: (val: T) => void;
  inputValue: string;
  onInputChange: (val: string) => void;
  selectWidth?: number | string;
  placeholder?: string;
}

export default function SearchForm<T extends string | number = string>({
  options,
  selectValue,
  onSelectChange,
  inputValue,
  onInputChange,
  selectWidth = 160,
  placeholder = 'Search...',
}: SearchFormProps<T>) {
  const selectOptions: SelectProps['options'] = options.map((opt) => ({
    label: opt.label,
    value: opt.value,
  }));

  return (
    <div className="flex items-center gap-4 mb-6">
      <Select
        style={{ minWidth: selectWidth }}
        options={selectOptions}
        value={selectValue}
        onChange={(val) => onSelectChange(val as T)}
      />
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        style={{ flex: 1 }}
      />
    </div>
  );
}
