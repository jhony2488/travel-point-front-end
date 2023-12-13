/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
    FormControl,
    TextField,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { inputStyles } from './style';

export default function Input({ control, nameInput, isMask = false, mask, valueInput, onChange, id, ...rest }) {
    const { search, input } = inputStyles();

    return (<>
        {control ? <Controller
            control={control}
            name={nameInput ? nameInput : ''}
            render={({ field: { onChange, value } }) => (
                <FormControl className={search}>

                    {isMask ? <InputMask
                        mask={mask}
                        {...rest}
                        onChange={onChange}
                        value={control ? value : valueInput}
                    >
                      <TextField
                            size="small"
                            className={input}
                            variant="outlined"
                            id={id}
                            onChange={onChange}
                            color="primary"
                            InputProps={{
                                classes: { input }
                            }}
                            {...rest}
                        />
                    </InputMask> : <TextField
                        size="small"
                        className={input}
                        id={id}
                        onChange={onChange}
                        variant="outlined"
                        color="primary"
                        InputProps={{
                            classes: { input }
                        }}
                        {...rest}
                    />}

                </FormControl>

            )} /> : <FormControl className={search}>

            {isMask ? <InputMask
                mask={mask}
                {...rest}
                onChange={onChange}
                value={valueInput}
            >
               <TextField
                    size="small"
                    className={input}
                    variant="outlined"
                    id={id}
                    onChange={onChange}
                    color="primary"
                    InputProps={{
                        classes: { input }
                    }}
                    {...rest}
                />
            </InputMask> : <TextField
                size="small"
                className={input}
                id={id}
                onChange={onChange}
                variant="outlined"
                value={valueInput}
                color="primary"
                InputProps={{
                    classes: { input }
                }}
                {...rest}
            />}

        </FormControl>}
    </>

    );
}
