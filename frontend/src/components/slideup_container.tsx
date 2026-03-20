import { Component, ComponentProps } from 'solid-js'

const SlideUpContainer: Component<ComponentProps<'div'>> = (props) => (
    <div class="animate-slide-up opacity-0">{props.children}</div>
)

export default SlideUpContainer
