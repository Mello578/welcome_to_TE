import React, { Component, createRef, useState } from 'react';

class MainComponent extends Component {
    myRef = createRef(); // create simple ref

    toggleChildVisibility = () => this.myRef.current.toggleButton(); // method to hide or show child component

    render() {
        return (
            <>
                <button onClick={this.toggleChildVisibility}>toggle child component</button>
                <ChildComponent ref={this.myRef} />  {/* set ref to controll child component */}
            </>
        );
    }
};

const ChildComponent = React.forwardRef((props, ref) => {
    const [isActive, setIsActive] = useState(true);

    const toggleButton = () => setIsActive(prevState => !prevState);
    React.useImperativeHandle(ref, () => ({ toggleButton }));

    return (
        isActive ? <div>child component</div> : null
    );
});
