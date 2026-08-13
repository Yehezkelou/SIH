"use client";

import React, { forwardRef } from "react";
import { Input, InputProps } from "./input";
import { Calendar } from "lucide-react";

export const DatePicker = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <Input
        type="date"
        ref={ref}
        rightIcon={<Calendar className="w-4 h-4 text-sky-600" />}
        {...props}
      />
    );
  }
);

DatePicker.displayName = "DatePicker";