import { Component, For, JSXElement } from 'solid-js'
import Select from './select'
import InputFrame from './inputframe'

type ValidInputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

interface inputboxProps {
    label: string
    placeholder: string
    type: ValidInputType
    options: Array<string>
}

const OptionBox: Component<inputboxProps> = (props) => (
    <InputFrame content={(<>
        <span class="pr-2">{props.label}</span>
        <Select
            name="d"
            value=""
            content={
                (<For each={props.options}>
                    {
                        (item) => 
                            (<option>{item}</option>)
                        
                    }
                </For>)
            }
        ></Select>
    </>)}/>
)

export default OptionBox
