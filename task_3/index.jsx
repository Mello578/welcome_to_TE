import { Fragment, memo, useMemo } from 'react';

const MainComponent = ({
    user = { name: 'unknown', age: null } // default value for `props.user`
}) => {

    const userMemoProps = useMemo(() => user, [user.name, user.age]);

    return (
        <Fragment>
            <ChildComponent user={userMemoProps} />
        </Fragment>
    );
};

// memoized component
const ChildComponent = memo(({ user: { name, age } }) => {
    return (
        <div>user name: {name}, user age: {age}</div>
    )
});
