import React from 'react'
import { ToastsContainer, ToastsStore } from 'react-toasts';

export default function Test() {
    return (
        <div>
            <ToastsContainer store={ToastsStore} />
            <button onClick={() => ToastsStore.success("Hey, you just clicked!")}>Click me</button>
        </div>
    )
}
