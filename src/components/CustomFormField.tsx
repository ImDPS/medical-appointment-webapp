import React from 'react'
import {
    FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Control } from 'react-hook-form'
import { Input } from './ui/input';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { E164Number } from "libphonenumber-js/core"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface CustomFormFieldProps {
    control: Control<any>;
    fieldType: FormFieldType;
    name: string;
    label: string;
    placeholder?: string;
    iconStr?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field:any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any, props: CustomFormFieldProps}) => {
    
    const { fieldType, name, placeholder, iconStr, iconAlt, showTimeSelect, dateFormat, renderSkeleton } = props
    
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md  border border-dark-300 bg-dark-400'>
                    {iconStr && (
                        <Image 
                            src={iconStr}
                            alt={iconAlt || 'icon'}
                            width={24}
                            height={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput 
                        defaultCountry='IN'
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className='input-phone'

                    />
                </FormControl>
            )
        
            case FormFieldType.DATE_PICKER:
                return (
                    <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                        <Image 
                            src="/assets/icons/calendar.svg"
                            height={24}
                            width={24}
                            alt='calendar'
                            className='ml-2'
                        />
                        <FormControl>
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat={dateFormat ?? 'dd/MM/yyyy'}
                                showTimeSelect={showTimeSelect ?? false}
                                timeInputLabel='Time:'
                                wrapperClassName='date-picker'
                            />
                        </FormControl>
                    </div>
                )

            case FormFieldType.SKELETON:
                return renderSkeleton ? renderSkeleton(field) : null
        default:
            break;
    }
}

export const CustomFormField = (props: CustomFormFieldProps) => {
  const {control, fieldType, name, label, placeholder } = props
  
    return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex-1'>
        {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
        )}
        
        <RenderField props={props} field={field} />

        <FormMessage className='shad-error' />
      </FormItem>
    )}
  />
  )
}